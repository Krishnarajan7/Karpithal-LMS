from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, UserProfile


class UserAdmin(BaseUserAdmin):
    # Use email instead of username
    ordering = ["email"]
    list_display = ["email", "role", "is_active", "is_staff", "is_superuser"]
    list_filter = ["role", "is_active", "is_staff", "is_superuser"]

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name")}),
        (_("Permissions"), {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
        (_("Role"), {"fields": ("role",)}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "role", "is_active", "is_staff"),
            },
        ),
    )

    search_fields = ("email", "first_name", "last_name")


admin.site.register(User, UserAdmin)
admin.site.register(UserProfile)
