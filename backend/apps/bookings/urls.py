from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.bookings.views import BookingViewSet, EstimatePricingView

router = DefaultRouter()
router.register(r'', BookingViewSet, basename='booking')

urlpatterns = [
    path('estimate/', EstimatePricingView.as_view(), name='booking-estimate'),
    path('', include(router.urls)),
]
