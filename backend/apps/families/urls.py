from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.families.views import FamilyViewSet, FamilyMemberViewSet

router = DefaultRouter()
router.register(r'members', FamilyMemberViewSet, basename='family-member')
router.register(r'', FamilyViewSet, basename='family')

urlpatterns = [
    path('', include(router.urls)),
]
