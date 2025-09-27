import uuid
import os
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator, FileExtensionValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

# Helper functions
def user_profile_picture_path(instance, filename):
    """
    Generate a unique file path for user profile pictures using UUID.
    """
    ext = filename.split('.')[-1].lower()
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join("profile_pictures", str(instance.user.id), filename)


def validate_image_size(image):
    """
    Ensure uploaded image is smaller than 5MB.
    """
    max_size = 5 * 1024 * 1024  # 5MB
    if image.size > max_size:
        raise ValidationError(f"Image size must be less than {max_size // (1024*1024)}MB.")


# User Model
class User(AbstractUser):
    """
    Custom User model using email as username.
    Supports student, instructor, and admin roles.
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

    # New instructors/admins inactive by default until approved
    is_active = models.BooleanField(
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unapproved instructors/admins will have this set to False."
        ),
    )

    # Use email as username
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        """
        Automatically deactivate new instructors/admins until approved.
        """
        if self.role in [self.INSTRUCTOR, self.ADMIN] and not self.pk:
            self.is_active = False
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.email} ({self.role})"

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        indexes = [models.Index(fields=["role"])]


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
