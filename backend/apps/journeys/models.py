from django.db import models
from apps.core.models import BaseModel
from apps.bookings.models import Booking

class Journey(BaseModel):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='journey')
    started_at = models.DateTimeField(null=True, blank=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    current_status = models.CharField(max_length=50, default='ASSIGNED')
    current_latitude = models.FloatField(null=True, blank=True)
    current_longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Journey for Booking {self.booking.booking_code} ({self.current_status})"

class JourneyEvent(BaseModel):
    EVENT_TYPE_CHOICES = (
        ('BOOKING_CONFIRMED', 'Booking Confirmed'),
        ('COMPANION_ASSIGNED', 'Companion Assigned'),
        ('COMPANION_STARTED_TRIP', 'Companion En Route to Pickup'),
        ('COMPANION_ARRIVED', 'Arrived at Pickup Location'),
        ('PATIENT_JOURNEY_STARTED', 'Patient Journey Started'),
        ('REACHED_HOSPITAL', 'Reached Hospital / Clinic OPD'),
        ('CONSULTATION_COMPLETED', 'Consultation Completed'),
        ('RETURNING', 'Returning Home'),
        ('COMPLETED', 'Journey Completed'),
    )

    journey = models.ForeignKey(Journey, on_delete=models.CASCADE, related_name='events')
    event_type = models.CharField(max_length=40, choices=EVENT_TYPE_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)
    location_name = models.CharField(max_length=200, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    metadata = models.JSONField(default=dict)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"[{self.timestamp}] {self.event_type} at {self.location_name}"

class HealthJourney(BaseModel):
    patient = models.ForeignKey('accounts.PatientProfile', on_delete=models.CASCADE, related_name='health_journeys')
    title = models.CharField(max_length=200) # e.g. "Mom — Knee Treatment"
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='ACTIVE')

    def __str__(self):
        return f"{self.title} ({self.patient.user.first_name})"

class HealthJourneyEvent(BaseModel):
    EVENT_TYPE_CHOICES = (
        ('DOCTOR_VISIT', 'Doctor Consultation'),
        ('LAB_TEST', 'Diagnostic Lab Test'),
        ('PRESCRIPTION', 'Prescription Uploaded'),
        ('HOSPITAL_VISIT', 'Hospital OPD Visit'),
        ('DISCHARGE', 'Post-Discharge Care'),
        ('MEDICATION', 'Medication Adjustment'),
        ('FOLLOW_UP', 'Follow-up Session'),
        ('COMPANION_VISIT', 'JetPulse Companion Escort'),
        ('DOCUMENT', 'Document Vault Entry'),
        ('FAMILY_NOTE', 'Family Update Note'),
    )

    journey = models.ForeignKey(HealthJourney, on_delete=models.CASCADE, related_name='timeline_events')
    event_type = models.CharField(max_length=30, choices=EVENT_TYPE_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True)
    document = models.ForeignKey('health_records.HealthDocument', on_delete=models.SET_NULL, null=True, blank=True)
    booking = models.ForeignKey('bookings.Booking', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.journey.title} - {self.event_type}: {self.title}"

