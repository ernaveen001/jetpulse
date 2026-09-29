from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.companions.views import CompanionViewSet, CompanionOperationsViewSet

router = DefaultRouter()
router.register(r'me', CompanionOperationsViewSet, basename='companion-ops')
router.register(r'', CompanionViewSet, basename='companion-public')

urlpatterns = [
    path('', include(router.urls)),
]
