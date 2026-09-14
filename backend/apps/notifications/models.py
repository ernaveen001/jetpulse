from django.db import models
from apps.core.models import BaseModel
from apps.accounts.models import User

class Notification(BaseModel):
    NOTIFICATION_TYPE_CHOICES = (
        ('BOOKING', 'Booking Update'),
        ('COMPANION', 'Companion Status'),
        ('APPOINTMENT', 'Appointment Reminder'),
        ('FAMILY', 'Family Health Update'),
        ('DOCUMENT', 'Document Uploaded'),
        ('NAVIGATOR', 'Care Navigator Advisory'),
        ('PAYMENT', 'Payment Status'),
        ('SYSTEM', 'System Alert'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    type = models.CharField(max_length=30, choices=NOTIFICATION_TYPE_CHOICES, default='SYSTEM')
    title = models.CharField(max_length=200)
    message = models.TextField()
    data = models.JSONField(default=dict)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Notification to {self.user.first_name}: {self.title}"
