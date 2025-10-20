from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction

from .serializers import (
    UserRegistrationSerializer,
    UserSerializer,
    UserProfileSerializer,
    OAuthLoginSerializer,
    ChangePasswordSerializer,
    PasswordResetConfirmSerializer,
)
from .permissions import HasRole, IsStudent, IsInstructor, IsAdmin

User = get_user_model()


# ---------------------------
# JWT token helper
# ---------------------------
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {"refresh": str(refresh), "access": str(refresh.access_token)}


# ---------------------------
# Email/Password Registration
# ---------------------------
class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            user = serializer.save()

        # Optionally send verification email if not active
        # You can integrate with allauth or custom email service
        if not user.is_active:
            # send_email_confirmation(request, user, signup=True)  # Uncomment if using allauth
            pass

        tokens = get_tokens_for_user(user) if user.is_active else None

        return Response(
            {
                "success": True,
                "data": {
                    "user": UserSerializer(user).data,
                    "tokens": tokens,
                },
                "message": (
                    "User registered successfully. Please verify your email."
                    if not user.is_active
                    else "User registered successfully."
                ),
            },
            status=status.HTTP_201_CREATED,
        )


# ---------------------------
# OAuth Login/Signup
# ---------------------------
class OAuthLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = OAuthLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, created = serializer.create_or_get_user()
        tokens = get_tokens_for_user(user)

        return Response(
            {
                "success": True,
                "user": UserSerializer(user).data,
                "tokens": tokens,
                "created": created,
            },
            status=status.HTTP_200_OK,
        )


# ---------------------------
# Retrieve / Update Current User
# ---------------------------
class UserMeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        # Prevent password updates here
        if "password" in request.data:
            return Response(
                {"success": False, "message": "Use password reset endpoint to change password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Handle nested profile update
        profile_data = request.data.get("profile", None)
        with transaction.atomic():
            user = super().update(request, *args, **kwargs)
            if profile_data:
                profile_serializer = UserProfileSerializer(
                    instance=request.user.profile,
                    data=profile_data,
                    partial=True,
                )
                profile_serializer.is_valid(raise_exception=True)
                profile_serializer.save()

        return Response(
            {"success": True, "user": UserSerializer(request.user).data},
            status=status.HTTP_200_OK,
        )


# ---------------------------
# Role-Protected Views
# ---------------------------
class StudentOnlyView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, IsStudent]
    def get(self, request):
        return Response({"success": True, "message": "Welcome, Student!"}, status=status.HTTP_200_OK)


class InstructorOnlyView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def get(self, request):
        return Response({"success": True, "message": "Welcome, Instructor!"}, status=status.HTTP_200_OK)


# ---------------------------
# Admin: Approve User
# ---------------------------
class AdminApproveUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()
            return Response({"success": True, "message": f"User {user.email} has been approved."})
        return Response({"success": False, "message": f"User {user.email} is already active."})


# ---------------------------
# Email Verification
# ---------------------------
class EmailVerificationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"success": False, "message": "Invalid verification link."}, status=status.HTTP_400_BAD_REQUEST)

        if user.is_active:
            return Response({"success": False, "message": "User is already active."}, status=status.HTTP_400_BAD_REQUEST)

        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({"success": True, "message": "Email verified successfully."}, status=status.HTTP_200_OK)

        return Response({"success": False, "message": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)


# ---------------------------
# Password Reset Request
# ---------------------------
class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"success": False, "message": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Use allauth ResetPasswordForm if desired
        from allauth.account.forms import ResetPasswordForm
        form = ResetPasswordForm(data={"email": email})
        if form.is_valid():
            form.save(request=request)

        return Response({"success": True, "message": "If the email exists, a reset link has been sent."}, status=status.HTTP_200_OK)


# ---------------------------
# Password Reset Confirm
# ---------------------------
# Refactored views.py for PasswordResetConfirmView

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, uidb64, token):
        # Merge URL parameters and request body into one dictionary
        data = request.data.copy()
        data['uidb64'] = uidb64
        data['token'] = token
        
        # Pass the combined data to the new serializer
        serializer = PasswordResetConfirmSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        # Save implicitly sets the new password
        serializer.save()

        return Response({"success": True, "message": "Password reset successfully."}, status=status.HTTP_200_OK)

# views.py
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 1. Pass the context to the serializer for validation (critical)
        serializer = ChangePasswordSerializer(
            data=request.data, 
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"success": True, "message": "Password changed successfully."},
            status=status.HTTP_200_OK
        )