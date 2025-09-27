from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from .serializers import UserRegistrationSerializer, UserSerializer
from .permissions import IsStudent, IsInstructor
from .models import User

class UserRegistrationView(CreateAPIView):
    """
    Handles user registration. Allows optional role selection (is_student or is_instructor).
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

class UserMeView(RetrieveAPIView):
    """
    Returns the logged-in user's data.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class StudentOnlyView(APIView):
    """
    Example view for students only.
    """
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request):
        return Response({"message": "Welcome, Student!"}, status=status.HTTP_200_OK)

class InstructorOnlyView(APIView):
    """
    Example view for instructors only.
    """
    permission_classes = [IsAuthenticated, IsInstructor]

    def get(self, request):
        return Response({"message": "Welcome, Instructor!"}, status=status.HTTP_200_OK)
