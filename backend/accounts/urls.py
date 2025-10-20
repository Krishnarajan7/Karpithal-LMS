from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

from .views import (
    UserRegistrationView,
    UserMeView,
    StudentOnlyView,
    InstructorOnlyView,
    EmailVerificationView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    OAuthLoginView,
    AdminApproveUserView,
    ChangePasswordView,
    # ProfilePictureUploadView is removed from imports
)

app_name = "accounts"

urlpatterns = [
    # ---------------------------
    # User Registration & Profile
    # ---------------------------
    path('api/v1/register/', UserRegistrationView.as_view(), name='user-register'),
    path('api/v1/me/', UserMeView.as_view(), name='user-me'),
    path('api/v1/change-password/', ChangePasswordView.as_view(), name='change-password'),

    # ---------------------------
    # JWT Authentication
    # ---------------------------
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/login/', TokenObtainPairView.as_view(), name='login-alias'),

    # ---------------------------
    # OAuth Login / Signup
    # ---------------------------
    path('api/v1/oauth/login/', OAuthLoginView.as_view(), name='oauth-login'),

    # ---------------------------
    # Role-Based Access
    # ---------------------------
    path('api/v1/student/', StudentOnlyView.as_view(), name='student-only'),
    path('api/v1/instructor/', InstructorOnlyView.as_view(), name='instructor-only'),

    # ---------------------------
    # Admin Endpoints
    # ---------------------------
    path('api/v1/admin/approve-user/<int:pk>/', AdminApproveUserView.as_view(), name='admin-approve-user'),

    # ---------------------------
    # Email Verification & Password Reset
    # ---------------------------
    path('api/v1/email-verify/<str:uidb64>/<str:token>/', EmailVerificationView.as_view(), name='email-verify'),
    path('api/v1/password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('api/v1/password-reset-confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),

    # ---------------------------
    # API Schema & Documentation
    # ---------------------------
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]