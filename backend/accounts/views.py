from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from allauth.account.utils import send_email_confirmation
from allauth.account.forms import ResetPasswordForm
from rest_framework.generics import UpdateAPIView

# Imports for Django Token Logic (used for Verification and Password Reset)
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str

# Cleaned up imports (removed EmailConfirmationHMAC and get_object_or_404 as they are not used)

from .serializers import (
    UserRegistrationSerializer,
    UserSerializer,
    UserProfileSerializer,
)
from .permissions import HasRole
from .models import User

User = get_user_model()


# JWT token generator helper
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class UserRegistrationView(generics.CreateAPIView):
    """Registers a new user (default: student) and sends verification email."""

    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # NOTE: allauth's send_email_confirmation is still used here, but for this
        # custom flow to work, you must ensure your email template for confirmation
        # is manually constructed using the standard Django uid/token URL.
        if not user.is_active:
            send_email_confirmation(request, user, signup=True)

        # Only return tokens if user is active
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


class UserMeView(generics.RetrieveUpdateAPIView):
    # ... (UNCHANGED) ...
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        if "password" in request.data:
            return Response(
                {
                    "success": False,
                    "message": "Use the password reset endpoint to change passwords.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().update(request, *args, **kwargs)


class StudentOnlyView(generics.GenericAPIView):
    # ... (UNCHANGED) ...
    permission_classes = [IsAuthenticated, HasRole("student")]

    def get(self, request):
        return Response(
            {"success": True, "message": "Welcome, Student!"}, status=status.HTTP_200_OK
        )


class InstructorOnlyView(generics.GenericAPIView):
    # ... (UNCHANGED) ...
    permission_classes = [IsAuthenticated, HasRole("instructor")]

    def get(self, request):
        return Response(
            {"success": True, "message": "Welcome, Instructor!"},
            status=status.HTTP_200_OK,
        )


class AdminApproveUserView(UpdateAPIView):
    # ... (UNCHANGED) ...
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, HasRole(allowed_roles=[User.ADMIN])]

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            user.is_active = True  # Approve the user
            user.save()
            return Response(
                {"success": True, "message": f"User {user.email} has been approved."}
            )
        return Response(
            {"success": False, "message": f"User {user.email} is already active."}
        )


class PasswordResetRequestView(APIView):
    # ... (UNCHANGED - Correctly uses allauth's ResetPasswordForm) ...
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response(
                {"success": False, "message": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        form = ResetPasswordForm(data={"email": email})
        if form.is_valid():
            form.save(request=request)
        return Response(
            {
                "success": True,
                "message": "If the email exists, a reset link has been sent.",
            },
            status=status.HTTP_200_OK,
        )


class ProfilePictureUploadView(APIView):
    # ... (UNCHANGED) ...
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # NOTE: Assumes request.user has a related 'profile' object
        serializer = UserProfileSerializer(
            instance=request.user.profile, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "Profile picture uploaded successfully."},
                status=status.HTTP_200_OK,
            )
        errors = {k: [str(e) for e in v] for k, v in serializer.errors.items()}
        return Response(
            {"success": False, "message": errors}, status=status.HTTP_400_BAD_REQUEST
        )


class EmailVerificationView(APIView):
    """
    Handles email verification using Django's default uidb64/token.
    This logic MUST be consistent with the email template used by allauth's
    send_email_confirmation.
    """

    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        # ... (Correct logic using Django's default token) ...
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"success": False, "message": "Invalid verification link."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.is_active:
            return Response(
                {"success": False, "message": "User is already active."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response(
                {"success": True, "message": "Email verified successfully."},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"success": False, "message": "Invalid or expired token."},
            status=status.HTTP_400_BAD_REQUEST,
        )


class PasswordResetConfirmView(APIView):
    """
    Confirms a password reset using Django's default uidb64/token.
    Expects 'uidb64' and 'token' from the email link, and 'password' in request body.
    """

    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        # ... (Correct logic using Django's default token) ...
        new_password = request.data.get("password")
        if not new_password:
            return Response(
                {"success": False, "message": "Password is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"success": False, "message": "Invalid reset link."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {"success": False, "message": "Invalid or expired token."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()
        return Response(
            {"success": True, "message": "Password reset successfully."},
            status=status.HTTP_200_OK,
        )