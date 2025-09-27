from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


class HasRole(BasePermission):
    """
    Custom permission to check if the authenticated user has one of the allowed roles.
    Usage:
        permission_classes = [HasRole(allowed_roles=[User.STUDENT])]
    """

    def __init__(self, allowed_roles=[]):
        self.allowed_roles = allowed_roles

    def has_permission(self, request, view):
        user = request.user
        return (
            user.is_authenticated
            and user.is_active  # Ensure the user is active (approved)
            and user.role in self.allowed_roles
        )


class IsOwnerOrReadOnly(BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Read-only access is allowed for everyone.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        owner = getattr(obj, "owner", getattr(obj, "user", None))
        return owner is not None and owner == request.user
