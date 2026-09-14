from django.db import models
from apps.core.models import BaseModel
from apps.accounts.models import User, PatientProfile
from apps.providers.models import Provider
from apps.bookings.models import Booking
from apps.journeys.models import HealthJourney

class Appointment(BaseModel):
    STATUS_CHOICES = (
        ('UPCOMING', 'Upcoming Appointment'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
        ('RESCHEDULED', 'Rescheduled'),
    )

    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='appointments')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_appointments')
    provider = models.ForeignKey(Provider, on_delete=models.SET_NULL, null=True, blank=True, related_name='appointments')
    doctor_name = models.CharField(max_length=150, blank=True)
    
    scheduled_at = models.DateTimeField(db_index=True)
    purpose = models.CharField(max_length=200) # e.g. "Cardiology Follow-up"
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='UPCOMING', db_index=True)
    notes = models.TextField(blank=True)
    
    booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True, blank=True, related_name='linked_appointments')
    health_journey = models.ForeignKey(HealthJourney, on_delete=models.SET_NULL, null=True, blank=True, related_name='linked_appointments')

    def __str__(self):
        return f"Appointment for {self.patient.user.first_name} on {self.scheduled_at}"
