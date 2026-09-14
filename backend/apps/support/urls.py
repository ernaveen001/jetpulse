from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.support.views import SupportTicketViewSet, FAQViewSet

router = DefaultRouter()
router.register(r'tickets', SupportTicketViewSet, basename='support-ticket')
router.register(r'faqs', FAQViewSet, basename='faq')

urlpatterns = [
    path('', include(router.urls)),
]
