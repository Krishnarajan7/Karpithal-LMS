from django.urls import path
from .views import UserRegistrationView, UserMeView, StudentOnlyView, InstructorOnlyView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('me/', UserMeView.as_view(), name='user-me'),
    path('student/', StudentOnlyView.as_view(), name='student-only'),
    path('instructor/', InstructorOnlyView.as_view(), name='instructor-only'),
]