from rest_framework import serializers
from apps.bookings.models import Booking
from apps.accounts.serializers import PatientProfileSerializer, UserSerializer
from apps.companions.serializers import CompanionProfileSerializer
from apps.providers.serializers import ProviderSerializer

class BookingSerializer(serializers.ModelSerializer):
    patient_details = PatientProfileSerializer(source='patient', read_only=True)
    booked_by_details = UserSerializer(source='booked_by', read_only=True)
    companion_details = CompanionProfileSerializer(source='assigned_companion', read_only=True)
    provider_details = ProviderSerializer(source='provider', read_only=True)

    class Meta:
        model = Booking
        fields = (
            'id', 'booking_code', 'booking_type', 'booked_by', 'booked_by_details',
            'patient', 'patient_details', 'family', 'service_type', 'transport_type',
            'pickup_address', 'pickup_city', 'pickup_latitude', 'pickup_longitude',
            'destination_address', 'destination_city', 'destination_latitude', 'destination_longitude',
            'provider', 'provider_details', 'assigned_companion', 'companion_details',
            'scheduled_at', 'estimated_duration_hours', 'actual_duration_hours',
            'status', 'estimated_price', 'final_price', 'special_instructions', 'created_at'
        )
        read_only_fields = ('id', 'booking_code', 'booked_by', 'status', 'estimated_price', 'final_price', 'created_at')

class EstimateRequestSerializer(serializers.Serializer):
    service_type = serializers.CharField(default='DOCTOR_VISIT')
    transport_type = serializers.CharField(default='car')
    duration_hours = serializers.IntegerField(default=3)
    distance_km = serializers.FloatField(default=12.4)
