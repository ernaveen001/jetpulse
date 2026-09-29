from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.journeys.models import Journey, JourneyEvent, HealthJourney, HealthJourneyEvent
from apps.journeys.serializers import JourneySerializer, JourneyEventSerializer, HealthJourneySerializer, HealthJourneyEventSerializer

class JourneyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = JourneySerializer

    def get_queryset(self):
        user = self.request.user
        return Journey.objects.filter(booking__booked_by=user) | Journey.objects.filter(booking__patient__user=user)

    @action(detail=True, methods=['post'])
    def add_event(self, request, pk=None):
        journey = self.get_object()
        serializer = JourneyEventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        event = serializer.save(journey=journey)

        journey.current_status = event.event_type
        if event.latitude:
            journey.current_latitude = event.latitude
        if event.longitude:
            journey.current_longitude = event.longitude
        journey.save()

        return Response({
            "success": True,
            "message": "Journey event recorded.",
            "data": JourneyEventSerializer(event).data
        }, status=status.HTTP_201_CREATED)

class HealthJourneyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = HealthJourneySerializer

    def get_queryset(self):
        user = self.request.user
        return HealthJourney.objects.filter(patient__user=user) | HealthJourney.objects.filter(patient__family_memberships__family__owner=user)

    @action(detail=True, methods=['post'])
    def add_timeline_event(self, request, pk=None):
        health_journey = self.get_object()
        serializer = HealthJourneyEventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        event = serializer.save(journey=health_journey, created_by=request.user)

        return Response({
            "success": True,
            "message": "Health journey timeline event added.",
            "data": HealthJourneyEventSerializer(event).data
        }, status=status.HTTP_201_CREATED)
