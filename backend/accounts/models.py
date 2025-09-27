from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_instructor = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.is_student:
            self.is_instructor = False
        elif self.is_instructor:
            self.is_student = False
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
