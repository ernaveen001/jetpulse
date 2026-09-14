from django.db import models
from apps.core.models import BaseModel

class Provider(BaseModel):
    PROVIDER_TYPE_CHOICES = (
        ('HOSPITAL', 'Hospital'),
        ('CLINIC', 'Specialty Clinic'),
        ('LAB', 'Diagnostic Laboratory'),
        ('DIAGNOSTIC_CENTER', 'Imaging & Scan Center'),
        ('PHARMACY', 'Pharmacy'),
    )

    name = models.CharField(max_length=200, db_index=True)
    type = models.CharField(max_length=30, choices=PROVIDER_TYPE_CHOICES, db_index=True)
    description = models.TextField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    
    address = models.TextField()
    city = models.CharField(max_length=100, db_index=True)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    
    services = models.JSONField(default=list, help_text="List of services offered e.g. ['Cardiology', 'OPD', 'MRI']")
    facilities = models.JSONField(default=list, help_text="Facilities e.g. ['TPA Cashless', 'Emergency', 'Wheelchair Access']")
    opening_hours = models.CharField(max_length=150, default='Open 24/7')
    
    is_verified = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    
    rating = models.FloatField(default=4.8)
    reviews_count = models.PositiveIntegerField(default=120)

    def __str__(self):
        return f"{self.name} ({self.type} - {self.city})"

class ProviderPromotion(BaseModel):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='promotions')
    start_date = models.DateField()
    end_date = models.DateField()
    priority = models.PositiveIntegerField(default=1)
    campaign_status = models.CharField(max_length=20, default='ACTIVE')
    label = models.CharField(max_length=50, default='SPONSORED')

    def __str__(self):
        return f"Promotion for {self.provider.name} ({self.label})"
