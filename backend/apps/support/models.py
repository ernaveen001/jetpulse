from django.db import models
from apps.core.models import BaseModel
from apps.accounts.models import User

class SupportTicket(BaseModel):
    STATUS_CHOICES = (
        ('OPEN', 'Open'),
        ('IN_PROGRESS', 'In Progress'),
        ('RESOLVED', 'Resolved'),
        ('CLOSED', 'Closed'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='support_tickets')
    subject = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OPEN')
    priority = models.CharField(max_length=20, default='MEDIUM')

    def __str__(self):
        return f"Ticket #{self.id} ({self.status}) by {self.user.first_name}"

class FAQ(BaseModel):
    category = models.CharField(max_length=50, default='General')
    question = models.CharField(max_length=255)
    answer = models.TextField()
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return f"FAQ: {self.question}"
