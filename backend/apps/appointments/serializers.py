from rest_framework import serializers
from apps.appointments.models import Appointment
from apps.accounts.serializers import PatientProfileSerializer
from apps.providers.serializers import ProviderSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    patient_details = PatientProfileSerializer(source='patient', read_only=True)
    provider_details = ProviderSerializer(source='provider', read_only=True)

    class Meta:
        model = Appointment
        fields = ('id', 'patient', 'patient_details', 'created_by', 'provider', 'provider_details', 'doctor_name', 'scheduled_at', 'purpose', 'status', 'notes', 'booking', 'health_journey', 'created_at')
        read_only_fields = ('id', 'created_by', 'created_at')
