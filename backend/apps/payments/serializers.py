from rest_framework import serializers
from apps.payments.models import Payment, PricingRule

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'booking', 'user', 'amount', 'currency', 'status', 'transaction_id', 'payment_gateway', 'created_at')
        read_only_fields = ('id', 'user', 'status', 'created_at')

class PricingRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingRule
        fields = ('id', 'service_type', 'transport_type', 'hourly_rate', 'base_fee', 'transport_flat_fee', 'platform_fee', 'tax_percent')
