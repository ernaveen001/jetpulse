from django.db import models
from apps.core.models import BaseModel
from apps.accounts.models import User

class CompanionProfile(BaseModel):
    VERIFICATION_STATUS_CHOICES = (
        ('PENDING', 'Pending Verification'),
        ('UNDER_REVIEW', 'Under Review'),
        ('VERIFIED', 'Verified Companion'),
        ('REJECTED', 'Rejected'),
        ('SUSPENDED', 'Suspended'),
    )

    TRAINING_STATUS_CHOICES = (
        ('NOT_STARTED', 'Not Started'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Training Completed'),
    )

    STATUS_CHOICES = (
        ('OFFLINE', 'Offline'),
        ('AVAILABLE', 'Available for Bookings'),
        ('BUSY', 'Busy'),
        ('ON_TRIP', 'On Trip'),
        ('SUSPENDED', 'Suspended'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='companion_profile')
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUS_CHOICES, default='PENDING', db_index=True)
    training_status = models.CharField(max_length=20, choices=TRAINING_STATUS_CHOICES, default='NOT_STARTED')
    current_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OFFLINE', db_index=True)
    
    rating = models.FloatField(default=5.0)
    total_reviews = models.PositiveIntegerField(default=0)
    years_experience = models.PositiveIntegerField(default=1)
    languages = models.JSONField(default=list, help_text="Languages spoken e.g. ['English', 'Hindi']")
    bio = models.TextField(blank=True)
    service_radius_km = models.FloatField(default=25.0)
    city = models.CharField(max_length=100, db_index=True, default='Bangalore')
    
    current_latitude = models.FloatField(null=True, blank=True)
    current_longitude = models.FloatField(null=True, blank=True)
    
    transport_options = models.JSONField(default=list, help_text="Options e.g. ['companion_only', 'bike', 'car']")
    profile_photo = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return f"Companion: {self.user.first_name} {self.user.last_name} ({self.verification_status})"

class CompanionQualification(BaseModel):
    companion = models.ForeignKey(CompanionProfile, on_delete=models.CASCADE, related_name='qualifications')
    qualification_type = models.CharField(max_length=100) # e.g. CPR Certified, First Aid, Patient Handling
    institution = models.CharField(max_length=150)
    certificate_number = models.CharField(max_length=100, blank=True)
    document_url = models.CharField(max_length=500, blank=True)
    verification_status = models.CharField(max_length=20, choices=CompanionProfile.VERIFICATION_STATUS_CHOICES, default='PENDING')
    verified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.qualification_type} for {self.companion.user.first_name} ({self.verification_status})"

class CompanionAvailability(BaseModel):
    companion = models.ForeignKey(CompanionProfile, on_delete=models.CASCADE, related_name='availability_slots')
    date = models.DateField(db_index=True)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available = models.BooleanField(default=True)

    class Meta:
        unique_together = ('companion', 'date', 'start_time')

    def __str__(self):
        return f"{self.companion.user.first_name} slot on {self.date} {self.start_time}-{self.end_time}"
