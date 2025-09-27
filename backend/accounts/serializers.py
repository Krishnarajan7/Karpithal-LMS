from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration. Validates password and allows optional role selection.
    """
    password = serializers.CharField(write_only=True, validators=[validate_password])
    is_student = serializers.BooleanField(default=True, required=False)
    is_instructor = serializers.BooleanField(default=False, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_student', 'is_instructor']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for returning user data.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_student', 'is_instructor']
        read_only_fields = ['id']