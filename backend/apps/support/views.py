from rest_framework import viewsets, permissions
from apps.support.models import SupportTicket, FAQ
from apps.support.serializers import SupportTicketSerializer, FAQSerializer

class SupportTicketViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SupportTicketSerializer

    def get_queryset(self):
        return SupportTicket.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = FAQSerializer
    queryset = FAQ.objects.filter(is_published=True)
