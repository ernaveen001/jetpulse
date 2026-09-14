from rest_framework import serializers
from apps.providers.models import Provider, ProviderPromotion

class ProviderSerializer(serializers.ModelSerializer):
    is_sponsored = serializers.SerializerMethodSerializer()
    promotion_label = serializers.SerializerMethodSerializer()

    class Meta:
        model = Provider
        fields = (
            'id', 'name', 'type', 'description', 'phone', 'email', 'website',
            'address', 'city', 'state', 'pincode', 'latitude', 'longitude',
            'services', 'facilities', 'opening_hours', 'is_verified', 'is_active',
            'rating', 'reviews_count', 'is_sponsored', 'promotion_label', 'created_at'
        )

    def get_is_sponsored(self, obj):
        return obj.promotions.filter(campaign_status='ACTIVE').exists()

    def get_promotion_label(self, obj):
        promo = obj.promotions.filter(campaign_status='ACTIVE').first()
        return promo.label if promo else None
