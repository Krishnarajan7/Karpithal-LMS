import uuid
import os
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator, FileExtensionValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver

# Helper functions
def user_profile_picture_path(instance, filename):
    """
    Generate a unique file path for user profile pictures using UUID.
    Handles unsaved users gracefully.
    """
    ext = filename.split('.')[-1].lower()
    filename = f"{uuid.uuid4()}.{ext}"
    folder = str(instance.user.pk or uuid.uuid4())
    return os.path.join("profile_pictures", folder, filename)

def validate_image_size(image):
    """
    Ensure uploaded image is smaller than 5MB.
    """
    max_size = 5 * 1024 * 1024  # 5MB
    if image.size > max_size:
        raise ValidationError(f"Image size must be less than {max_size // (1024*1024)}MB.")


# Custom User Model
class User(AbstractUser):
    """
    Custom User model using email as username.
    Supports student, instructor, and admin roles.
    OAuth support for Google and GitHub.
    """

    # Roles
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"

    ROLE_CHOICES = [
        (STUDENT, "Student"),
        (INSTRUCTOR, "Instructor"),
        (ADMIN, "Admin"),
    ]

    # Core fields
    email = models.EmailField(
        _("email address"),
        unique=True,
        validators=[EmailValidator()],
        error_messages={"unique": _("A user with that email already exists.")},
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=STUDENT)

    # Approval & verification
    is_approved = models.BooleanField(
        default=False,
        help_text=_("Instructors/Admins must be approved before accessing the platform."),
    )
    is_verified = models.BooleanField(
        default=False,
        help_text=_("Email must be verified for normal users."),
    )

    # OAuth support
    google_id = models.CharField(max_length=255, blank=True, null=True, unique=True)
    github_id = models.CharField(max_length=255, blank=True, null=True, unique=True)
    OAUTH_PROVIDER_CHOICES = [
        ("google", "Google"),
        ("github", "GitHub"),
    ]
    oauth_provider = models.CharField(
        max_length=20,
        choices=OAUTH_PROVIDER_CHOICES,
        blank=True,
        null=True,
        help_text=_("Indicates if the user signed up via a social provider."),
    )

    # Use email as username
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        """
        Automatically approve students and handle OAuth users.
        """
        if self.role == self.STUDENT:
            self.is_approved = True

        # If signed up via OAuth, mark email as verified automatically
        if self.oauth_provider:
            self.is_verified = True

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.email} ({self.role})"

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        indexes = [models.Index(fields=["role"]), models.Index(fields=["oauth_provider"])]


# UserProfile Model
class UserProfile(models.Model):
    """
    Profile model associated with User.
    Includes bio and profile picture with size/type validation.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    bio = models.TextField(
        _("bio"), blank=True, null=True, default="Welcome to my Karpithal profile!"
    )
    profile_picture = models.ImageField(
        _("profile picture"),
        upload_to=user_profile_picture_path,
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png"]),
            validate_image_size,
        ],
        help_text=_("Allowed formats: JPG, JPEG, PNG. Max size: 5MB."),
    )

    def clean(self):
        """
        Additional validation on profile_picture if needed.
        """
        if self.profile_picture:
            validate_image_size(self.profile_picture)
            ext = self.profile_picture.name.split('.')[-1].lower()
            if ext not in ["jpg", "jpeg", "png"]:
                raise ValidationError("Only JPG, JPEG, PNG files are allowed.")
        super().clean()

    def __str__(self):
        return f"Profile of {self.user.email}"

    class Meta:
        verbose_name = _("user profile")
        verbose_name_plural = _("user profiles")


# Signal to automatically create UserProfile when a User is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
