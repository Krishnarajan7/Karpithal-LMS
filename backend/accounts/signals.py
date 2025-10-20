import logging
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist
from .models import User, UserProfile

logger = logging.getLogger(__name__)
DEFAULT_BIO = "Welcome to my Karpithal profile!"

@receiver(post_save, sender=User)
def create_or_ensure_user_profile(sender, instance, created, **kwargs):
    """
    Ensures every User has an associated UserProfile.
    - Creates profile with default bio for new users.
    - Ensures existing users without profiles get one.
    """
    user_identifier = instance.email  # Use email for logging

    try:
        profile, created_profile = UserProfile.objects.get_or_create(
            user=instance, defaults={"bio": DEFAULT_BIO}
        )
        if created_profile:
            logger.info(f"UserProfile created for user '{user_identifier}'.")
    except Exception as e:
        logger.error(
            f"Failed to create or ensure UserProfile for user '{user_identifier}': {str(e)}"
        )
