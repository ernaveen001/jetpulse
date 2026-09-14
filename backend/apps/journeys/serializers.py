from rest_framework import serializers
from apps.journeys.models import Journey, JourneyEvent, HealthJourney, HealthJourneyEvent

class JourneyEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = JourneyEvent
        fields = ('id', 'journey', 'event_type', 'timestamp', 'location_name', 'latitude', 'longitude', 'metadata')
        read_only_fields = ('id', 'timestamp')

class JourneySerializer(serializers.ModelSerializer):
    events = JourneyEventSerializer(many=True, read_only=True)

    class Meta:
        model = Journey
        fields = ('id', 'booking', 'started_at', 'ended_at', 'current_status', 'current_latitude', 'current_longitude', 'events', 'created_at')
        read_only_fields = ('id', 'created_at')

class HealthJourneyEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthJourneyEvent
        fields = ('id', 'journey', 'event_type', 'title', 'description', 'created_by', 'document', 'booking', 'created_at')
        read_only_fields = ('id', 'created_by', 'created_at')

class HealthJourneySerializer(serializers.ModelSerializer):
    timeline_events = HealthJourneyEventSerializer(many=True, read_only=True)

    class Meta:
        model = HealthJourney
        fields = ('id', 'patient', 'title', 'description', 'status', 'timeline_events', 'created_at')
        read_only_fields = ('id', 'created_at')
