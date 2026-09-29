from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.health_records.views import HealthDocumentViewSet

router = DefaultRouter()
router.register(r'', HealthDocumentViewSet, basename='document')

urlpatterns = [
    path('', include(router.urls)),
]
