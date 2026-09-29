from rest_framework import viewsets, permissions
from apps.appointments.models import Appointment
from apps.appointments.serializers import AppointmentSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        user = self.request.user
        return Appointment.objects.filter(created_by=user) | Appointment.objects.filter(patient__user=user)

    def perform_create(self, serializer):
        patient = serializer.validated_data.get('patient') or getattr(self.request.user, 'patient_profile', None)
        serializer.save(created_by=self.request.user, patient=patient)
