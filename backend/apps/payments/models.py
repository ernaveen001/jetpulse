from django.db import models
from apps.core.models import BaseModel
from apps.accounts.models import User
from apps.bookings.models import Booking

class PricingRule(BaseModel):
    service_type = models.CharField(max_length=40, default='DOCTOR_VISIT')
    transport_type = models.CharField(max_length=30, default='car')
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2, default=299.00)
    base_fee = models.DecimalField(max_digits=8, decimal_places=2, default=99.00)
    transport_flat_fee = models.DecimalField(max_digits=8, decimal_places=2, default=350.00)
    platform_fee = models.DecimalField(max_digits=8, decimal_places=2, default=49.00)
    tax_percent = models.DecimalField(max_digits=5, decimal_places=2, default=18.00)

    class Meta:
        unique_together = ('service_type', 'transport_type')

    def __str__(self):
        return f"Pricing {self.service_type}/{self.transport_type}: ₹{self.hourly_rate}/hr"

class Payment(BaseModel):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('AUTHORIZED', 'Authorized'),
        ('PAID', 'Paid'),
        ('FAILED', 'Failed'),
        ('REFUNDED', 'Refunded'),
        ('PARTIALLY_REFUNDED', 'Partially Refunded'),
    )

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='INR')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING', db_index=True)
    transaction_id = models.CharField(max_length=100, blank=True)
    payment_gateway = models.CharField(max_length=50, default='RAZORPAY')

    def __str__(self):
        return f"Payment {self.id} for Booking {self.booking.booking_code} ({self.status})"
