from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.journeys.views import JourneyViewSet, HealthJourneyViewSet

router = DefaultRouter()
router.register(r'health', HealthJourneyViewSet, basename='health-journey')
router.register(r'', JourneyViewSet, basename='journey')

urlpatterns = [
    path('', include(router.urls)),
]
