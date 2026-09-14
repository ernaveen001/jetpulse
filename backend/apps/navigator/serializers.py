from rest_framework import serializers
from apps.navigator.models import CareJourney, NavigatorMessage

class NavigatorMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavigatorMessage
        fields = ('id', 'care_journey', 'sender', 'message', 'attachments', 'recommended_pathway', 'is_urgent', 'disclaimer', 'created_at')
        read_only_fields = ('id', 'disclaimer', 'created_at')

class CareJourneySerializer(serializers.ModelSerializer):
    messages = NavigatorMessageSerializer(many=True, read_only=True)

    class Meta:
        model = CareJourney
        fields = ('id', 'user', 'patient', 'title', 'status', 'messages', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')

class QueryPromptSerializer(serializers.Serializer):
    message = serializers.CharField()
    attachments = serializers.ListField(child=serializers.CharField(), required=False, default=list)
    city = serializers.CharField(required=False, default='Bangalore')
