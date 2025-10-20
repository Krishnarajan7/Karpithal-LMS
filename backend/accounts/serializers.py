from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import UserProfile

User = get_user_model()


# ---------------------------
# UserProfile Serializer
# ---------------------------
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


# ---------------------------
# User Registration Serializer
# ---------------------------
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, default=User.STUDENT)
    profile = UserProfileSerializer(required=False)
    oauth_provider = serializers.ChoiceField(
        choices=User.OAUTH_PROVIDER_CHOICES, required=False, allow_null=True
    )

    class Meta:
        model = User
        fields = ["id", "email", "password", "role", "profile", "oauth_provider"]
        read_only_fields = ["id"]

    def validate_role(self, value):
        """
        Only admins can assign instructor/admin roles.
        """
        request = self.context.get("request")
        if value in [User.INSTRUCTOR, User.ADMIN]:
            if not request or not request.user.is_authenticated or request.user.role != User.ADMIN:
                raise ValidationError("Only admins can assign instructor or admin roles.")
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", None)
        password = validated_data.pop("password", None)
        oauth_provider = validated_data.pop("oauth_provider", None)

        user = User(**validated_data)

        if oauth_provider:
            # OAuth user: password-less, auto-verified
            user.oauth_provider = oauth_provider
            user.set_unusable_password()
            user.is_verified = True
        else:
            if not password:
                raise ValidationError("Password is required for email signup.")
            user.set_password(password)

        user.save()

        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)

        return user


# ---------------------------
# OAuth Login Serializer
# ---------------------------
class OAuthLoginSerializer(serializers.Serializer):
    provider = serializers.ChoiceField(choices=User.OAUTH_PROVIDER_CHOICES)
    oauth_id = serializers.CharField()
    email = serializers.EmailField(required=False)
    profile = UserProfileSerializer(required=False)

    def validate(self, data):
        provider = data.get("provider")
        oauth_id = data.get("oauth_id")

        if not provider or not oauth_id:
            raise ValidationError("Provider and OAuth ID are required.")

        return data

    def create_or_get_user(self):
        """
        Returns existing user if oauth_id exists, otherwise creates a new OAuth user.
        """
        provider = self.validated_data["provider"]
        oauth_id = self.validated_data["oauth_id"]
        email = self.validated_data.get("email")
        profile_data = self.validated_data.get("profile", {})

        lookup_field = f"{provider}_id"
        user_qs = User.objects.filter(**{lookup_field: oauth_id})
        if user_qs.exists():
            return user_qs.first(), False

        if not email:
            raise ValidationError("Email is required for new OAuth users.")

        user_data = {"email": email, "role": User.STUDENT, lookup_field: oauth_id, "is_verified": True}
        user = User.objects.create(**user_data)
        user.set_unusable_password()
        user.save()

        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)

        return user, True


# ---------------------------
# General User Serializer
# ---------------------------
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "role",
            "is_active",
            "is_verified",
            "is_approved",
            "profile",
        ]
        read_only_fields = ["id", "role", "is_active", "is_verified", "is_approved"]


# ---------------------------
# Admin User Serializer
# ---------------------------
class UserSerializerForAdmin(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "role",
            "is_active",
            "is_verified",
            "is_approved",
            "profile",
        ]
        read_only_fields = ["id"]
        extra_kwargs = {
            "role": {"required": True},
            "is_active": {"required": True},
            "is_verified": {"required": True},
            "is_approved": {"required": True},
        }
# ---------------------------
# Change Password Serializer    
# ---------------------------
class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for authenticated users to change their own password.
    """
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_new_password = serializers.CharField(write_only=True, required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise ValidationError("Old password is incorrect.")
        return value

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_new_password']:
            raise ValidationError({"confirm_new_password": "New passwords do not match."})
        return attrs

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user

# ---------------------------
# Password Reset Confirm Serializer
# ---------------------------
class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Serializer used to validate the password reset confirmation link 
    and set the new password.
    """
    uidb64 = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, validators=[validate_password])
    confirm_new_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        # 1. Check if the two new passwords match
        if attrs['new_password'] != attrs['confirm_new_password']:
            raise ValidationError({"confirm_new_password": "New passwords do not match."})

        # 2. Decode UID and check token validity
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.encoding import force_str
        from django.utils.http import urlsafe_base64_decode
        from django.core.exceptions import ObjectDoesNotExist

        try:
            uid = force_str(urlsafe_base64_decode(attrs['uidb64']))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, ObjectDoesNotExist):
            raise ValidationError({'uidb64': 'Invalid user ID.'})
        
        # Check if the token is valid for the user
        if not default_token_generator.check_token(user, attrs['token']):
            raise ValidationError({'token': 'Invalid or expired token.'})

        # Store the user object in validated_data for use in save()
        attrs['user'] = user
        return attrs

    def save(self, **kwargs):
        """
        Sets the new password for the validated user.
        """
        user = self.validated_data['user']
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user