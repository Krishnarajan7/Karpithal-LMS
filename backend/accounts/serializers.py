from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import UserProfile

User = get_user_model()


# UserProfile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = UserProfile
        fields = ["bio", "profile_picture"]

    def validate_profile_picture(self, value):
        if value:
            if value.size > 5 * 1024 * 1024:
                raise ValidationError("Profile picture size must be less than 5MB.")
            ext = value.name.split(".")[-1].lower()
            if ext not in ["jpg", "jpeg", "png"]:
                raise ValidationError("Only PNG, JPG, or JPEG files are allowed.")
        return value


# User Registration Serializer
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, default=User.STUDENT)
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ["id", "email", "password", "role", "profile"]
        read_only_fields = ["id"]

    def validate_role(self, value):
        request = self.context.get("request")
        if value in [User.INSTRUCTOR, User.ADMIN]:
            if not request or not request.user.is_authenticated or request.user.role != User.ADMIN:
                raise ValidationError("Only admins can assign instructor or admin roles.")
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", None)
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)

        return user


# User Serializer (general use)
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "role", "is_active", "profile"]
        read_only_fields = ["id", "role", "is_active"]


# Admin User Serializer
class UserSerializerForAdmin(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "role", "is_active", "profile"]
        read_only_fields = ["id"]
