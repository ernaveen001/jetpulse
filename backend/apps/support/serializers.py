from rest_framework import serializers
from apps.support.models import SupportTicket, FAQ

class SupportTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportTicket
        fields = ('id', 'user', 'subject', 'description', 'status', 'priority', 'created_at')
        read_only_fields = ('id', 'user', 'status', 'created_at')

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ('id', 'category', 'question', 'answer', 'is_published')
