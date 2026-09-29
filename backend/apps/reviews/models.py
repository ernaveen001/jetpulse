from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.core.models import BaseModel
from apps.accounts.models import User
from apps.companions.models import CompanionProfile
from apps.bookings.models import Booking

class Review(BaseModel):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='review')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submitted_reviews')
    companion = models.ForeignKey(CompanionProfile, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True)

    def __str__(self):
        return f"Review ({self.rating}★) for Companion {self.companion.user.first_name} by {self.user.first_name}"
