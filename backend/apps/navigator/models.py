from django.db import models
from apps.core.models import BaseModel
from apps.accounts.models import User, PatientProfile

class CareJourney(BaseModel):
    STATUS_CHOICES = (
        ('ACTIVE', 'Active Care Journey'),
        ('RESOLVED', 'Resolved'),
        ('ARCHIVED', 'Archived'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='care_journeys')
    patient = models.ForeignKey(PatientProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name='care_journeys')
    title = models.CharField(max_length=200, default='Healthcare Navigation')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ACTIVE')

    def __str__(self):
        return f"Care Journey {self.title} by {self.user.first_name}"

class NavigatorMessage(BaseModel):
    SENDER_CHOICES = (
        ('USER', 'User Prompt'),
        ('NAVIGATOR_AI', 'Care Navigator AI'),
    )

    care_journey = models.ForeignKey(CareJourney, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=20, choices=SENDER_CHOICES)
    message = models.TextField()
    attachments = models.JSONField(default=list, help_text="List of attached document IDs or file keys")
    recommended_pathway = models.CharField(max_length=150, blank=True)
    is_urgent = models.BooleanField(default=False)
    disclaimer = models.TextField(
        default="JetPulse Care Navigator provides informational and healthcare navigation support. It does not diagnose medical conditions or replace professional medical advice."
    )

    def __str__(self):
        return f"Message by {self.sender} in {self.care_journey.title}"
