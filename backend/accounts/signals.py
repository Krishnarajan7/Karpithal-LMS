import logging
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, UserProfile
from django.core.exceptions import ObjectDoesNotExist # Import to catch missing profile explicitly

logger = logging.getLogger(__name__)
DEFAULT_BIO = "Welcome to my Karpithal profile!"

@receiver(post_save, sender=User)
def create_or_ensure_user_profile(sender, instance, created, **kwargs):
    """
    Signal to ensure every User has an associated UserProfile.
    - Creates a profile with default bio for new users.
    - Ensures existing users (being updated) without profiles get one.
    """
    # Use email for logging since it's the USERNAME_FIELD
    user_identifier = instance.email 

    try:
        if created:
            # 1. Create profile for new users
            UserProfile.objects.create(user=instance, bio=DEFAULT_BIO)
        else:
            # 2. For existing users (being updated), check if profile exists
            try:
                # Attempt to access the profile (triggers exception if missing)
                # This is faster than get_or_create if the profile almost always exists
                instance.profile
            except ObjectDoesNotExist:
                # If profile is missing, create it
                UserProfile.objects.create(user=instance, bio=DEFAULT_BIO)

    except Exception as e:
        # Corrected log to use email and removed the 'raise' which can stop the save operation
        logger.error(f"Failed to create or ensure UserProfile for user '{user_identifier}': {str(e)}")
        # Note: We usually don't re-raise exceptions in post_save unless a crash is desired.
        # Allowing the User save to complete, even if the profile failed, might be necessary.