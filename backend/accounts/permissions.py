from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


# ---------------------------
# Generic Role-Based Permission
# ---------------------------
class HasRole(BasePermission):
    """
    Base class to check if the authenticated user has one of the allowed roles.
    Subclass this for each specific role to make DRF instantiation compatible.
    """

    allowed_roles = []

    def has_permission(self, request, view):
        user = request.user
        return (
            user.is_authenticated
            and user.is_active  # Only active users
            and user.role in self.allowed_roles
        )


# ---------------------------
# Subclasses for Each Role
# ---------------------------
class IsStudent(HasRole):
    allowed_roles = [User.STUDENT]


class IsInstructor(HasRole):
    allowed_roles = [User.INSTRUCTOR]


class IsAdmin(HasRole):
    allowed_roles = [User.ADMIN]


# ---------------------------
# Object-Level Permission: Owner or Read-Only
# ---------------------------
class IsOwnerOrReadOnly(BasePermission):
    """
    Object-level permission to allow only owners of an object to edit it.
    Read-only access is allowed for everyone.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        # Check for 'owner' attribute first, then fallback to 'user'
        owner = getattr(obj, "owner", getattr(obj, "user", None))
        return owner is not None and owner == request.user
