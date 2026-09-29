from django.db import models
from apps.core.models import BaseModel
from apps.accounts.models import User, PatientProfile

class HealthDocument(BaseModel):
    DOCUMENT_TYPE_CHOICES = (
        ('PRESCRIPTION', 'Prescription'),
        ('LAB_REPORT', 'Lab Test Report'),
        ('SCAN', 'MRI / CT Scan / Radiology'),
        ('DISCHARGE_SUMMARY', 'Discharge Summary'),
        ('DOCTOR_NOTE', 'Doctor OPD Notes'),
        ('OTHER', 'Other Document'),
    )

    VISIBILITY_CHOICES = (
        ('PRIVATE', 'Only Me'),
        ('FAMILY_ONLY', 'Shared with Family'),
        ('COMPANION_ALLOWED', 'Shared with Assigned Companion'),
    )

    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='health_documents')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_documents')
    title = models.CharField(max_length=200)
    document_type = models.CharField(max_length=30, choices=DOCUMENT_TYPE_CHOICES, default='OTHER')
    
    file_key = models.CharField(max_length=500, help_text="S3 Object Key for private storage")
    mime_type = models.CharField(max_length=100, default='application/pdf')
    file_size_bytes = models.PositiveIntegerField(default=0)
    
    visibility = models.CharField(max_length=30, choices=VISIBILITY_CHOICES, default='FAMILY_ONLY')

    def __str__(self):
        return f"{self.title} ({self.document_type}) for {self.patient.user.first_name}"
