from rest_framework import serializers
from apps.reviews.models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'booking', 'user', 'companion', 'rating', 'comment', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')
