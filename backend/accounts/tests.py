from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import UserProfile

User = get_user_model()


class UserRegistrationTest(APITestCase):
    def test_user_registration(self):
        url = reverse("accounts:user-register")
        data = {
            "email": "student@example.com",
            "password": "StrongPass123!",
            "role": "student",
            "profile": {"bio": "Hello, I am a student!"}
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['data']['user']['role'], 'student')


class AdminApproveUserTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            email="admin@example.com",
            password="AdminPass123!",
            role=User.ADMIN,
            is_active=True
        )
        self.instructor = User.objects.create_user(
            email="instructor@example.com",
            password="InstructorPass123!",
            role=User.INSTRUCTOR,
            is_active=False
        )
        # Log in as admin
        self.client.force_authenticate(user=self.admin)

    def test_admin_can_approve_instructor(self):
        url = reverse("accounts:admin-approve-user", args=[self.instructor.id])
        response = self.client.patch(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.instructor.refresh_from_db()
        self.assertTrue(self.instructor.is_active)

    def test_admin_approves_already_active_user(self):
        self.instructor.is_active = True
        self.instructor.save()
        url = reverse("accounts:admin-approve-user", args=[self.instructor.id])
        response = self.client.patch(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("already active", response.data["message"])


class ChangePasswordTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="user@example.com",
            password="OldPass123!"
        )
        self.client.force_authenticate(user=self.user)

    def test_change_password_success(self):
        url = reverse("accounts:change-password")
        data = {
            "old_password": "OldPass123!",
            "new_password": "NewStrongPass123!",
            "confirm_new_password": "NewStrongPass123!"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("NewStrongPass123!"))

    def test_change_password_wrong_old_password(self):
        url = reverse("accounts:change-password")
        data = {
            "old_password": "WrongOldPass",
            "new_password": "NewPass123!",
            "confirm_new_password": "NewPass123!"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class OAuthLoginTest(APITestCase):
    def test_oauth_user_creation(self):
        url = reverse("accounts:oauth-login")
        data = {
            "provider": "google",
            "oauth_id": "google123",
            "email": "oauthuser@example.com",
            "profile": {"bio": "OAuth user"}
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['created'])
        self.assertEqual(response.data['user']['email'], "oauthuser@example.com")


class PasswordResetTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="reset@example.com",
            password="ResetPass123!"
        )

    def test_password_reset_confirm(self):
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.http import urlsafe_base64_encode
        from django.utils.encoding import force_bytes

        uidb64 = urlsafe_base64_encode(force_bytes(self.user.pk))
        token = default_token_generator.make_token(self.user)

        url = reverse("accounts:password-reset-confirm", args=[uidb64, token])
        data = {
            "new_password": "NewPass123!",
            "confirm_new_password": "NewPass123!"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("NewPass123!"))
