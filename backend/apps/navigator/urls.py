from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.navigator.views import CareJourneyViewSet

router = DefaultRouter()
router.register(r'journeys', CareJourneyViewSet, basename='care-journey')

urlpatterns = [
    path('', include(router.urls)),
]
