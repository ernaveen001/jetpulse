import uuid
from django.db import models
from apps.core.models import BaseModel
from apps.accounts.models import User, PatientProfile
from apps.families.models import Family
from apps.companions.models import CompanionProfile
from apps.providers.models import Provider

class Booking(BaseModel):
    BOOKING_TYPE_CHOICES = (
        ('INSTANT', 'Instant Booking'),
        ('SCHEDULED', 'Scheduled Booking'),
    )

    SERVICE_TYPE_CHOICES = (
        ('DOCTOR_VISIT', 'Doctor & OPD Visit'),
        ('DIAGNOSTIC_TEST', 'Diagnostic Lab Support'),
        ('HOSPITAL_VISIT', 'Hospital Visit & Paperwork'),
        ('DISCHARGE_ASSISTANCE', 'Post-Discharge Escort'),
        ('FOLLOW_UP', 'Follow-up Consultation'),
        ('GENERAL_HEALTHCARE_ASSISTANCE', 'General Healthcare Escort'),
    )

    TRANSPORT_TYPE_CHOICES = (
        ('companion_only', 'Companion Only'),
        ('bike', 'Companion + Bike Escort'),
        ('car', 'Companion + AC Car'),
        ('hospital_lab', 'Dedicated Hospital/Lab Escort'),
    )

    STATUS_CHOICES = (
        ('DRAFT', 'Draft'),
        ('REQUESTED', 'Requested'),
        ('SEARCHING', 'Searching Companion'),
        ('COMPANION_ASSIGNED', 'Companion Assigned'),
        ('CONFIRMED', 'Confirmed'),
        ('COMPANION_ON_THE_WAY', 'Companion On The Way'),
        ('ARRIVED', 'Arrived at Pickup'),
        ('JOURNEY_STARTED', 'Journey En Route'),
        ('AT_PROVIDER', 'At Hospital / Clinic OPD'),
        ('CONSULTATION_COMPLETED', 'Consultation Completed'),
        ('RETURNING', 'Returning Home'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
        ('NO_SHOW', 'No Show'),
        ('DISPUTED', 'Disputed'),
    )

    booking_code = models.CharField(max_length=30, unique=True, db_index=True)
    booking_type = models.CharField(max_length=20, choices=BOOKING_TYPE_CHOICES, default='INSTANT')
    
    booked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_bookings')
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='patient_bookings')
    family = models.ForeignKey(Family, on_delete=models.SET_NULL, null=True, blank=True, related_name='family_bookings')
    
    service_type = models.CharField(max_length=40, choices=SERVICE_TYPE_CHOICES, default='DOCTOR_VISIT')
    transport_type = models.CharField(max_length=30, choices=TRANSPORT_TYPE_CHOICES, default='car')
    
    pickup_address = models.TextField()
    pickup_city = models.CharField(max_length=100, db_index=True)
    pickup_latitude = models.FloatField(null=True, blank=True)
    pickup_longitude = models.FloatField(null=True, blank=True)

    destination_address = models.TextField()
    destination_city = models.CharField(max_length=100)
    destination_latitude = models.FloatField(null=True, blank=True)
    destination_longitude = models.FloatField(null=True, blank=True)

    provider = models.ForeignKey(Provider, on_delete=models.SET_NULL, null=True, blank=True, related_name='provider_bookings')
    assigned_companion = models.ForeignKey(CompanionProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_bookings')

    scheduled_at = models.DateTimeField(db_index=True)
    estimated_duration_hours = models.PositiveIntegerField(default=3)
    actual_duration_hours = models.FloatField(null=True, blank=True)

    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='REQUESTED', db_index=True)
    
    estimated_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    final_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    special_instructions = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        if not self.booking_code:
            self.booking_code = f"JP-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Booking {self.booking_code} ({self.status}) - {self.patient.user.first_name}"
