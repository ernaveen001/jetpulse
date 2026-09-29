from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.accounts.views import RegisterView, LoginView, OTPRequestView, OTPVerifyView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth-register'),
    path('login/', LoginView.as_view(), name='auth-login'),
    path('refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
    path('otp/request/', OTPRequestView.as_view(), name='auth-otp-request'),
    path('otp/verify/', OTPVerifyView.as_view(), name='auth-otp-verify'),
]
