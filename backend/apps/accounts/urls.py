from django.urls import path
from apps.accounts.views import UserProfileView, PatientProfileView

urlpatterns = [
    path('me/', UserProfileView.as_view(), name='user-me'),
    path('me/patient-profile/', PatientProfileView.as_view(), name='patient-profile-me'),
]
