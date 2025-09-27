from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User

# Create your tests here.

class UserRegistrationTest(APITestCase):
    def test_user_registration(self):
        data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "strongpassword123",
            "role": "student"
        }
        response = self.client.post('/api/accounts/register/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['role'], 'student')

class AdminApproveUserTest(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username="admin", email="admin@example.com", password="admin123", role="admin", is_active=True
        )
        self.instructor = User.objects.create_user(
            username="instructor", email="instructor@example.com", password="password123", role="instructor", is_active=False
        )
        self.client.login(email="admin@example.com", password="admin123")

    def test_admin_approves_instructor(self):
        response = self.client.patch(f'/api/accounts/approve/{self.instructor.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.instructor.refresh_from_db()
        self.assertTrue(self.instructor.is_active)

    def test_admin_approves_already_active_user(self):
        self.instructor.is_active = True
        self.instructor.save()
        response = self.client.patch(f'/api/accounts/approve/{self.instructor.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("already active", response.data["message"])
