from decimal import Decimal
from apps.payments.models import PricingRule

class PricingService:
    @staticmethod
    def calculate_estimate(service_type='DOCTOR_VISIT', transport_type='car', duration_hours=3, distance_km=12.4):
        """
        Server-side calculation of transparent price estimate.
        Returns subtotal, companion_fee, transport_fee, platform_fee, tax, discount, and total.
        """
        rule = PricingRule.objects.filter(service_type=service_type, transport_type=transport_type).first()

        # Fallback defaults if rule not explicitly in DB
        hourly_rate = Decimal(str(rule.hourly_rate)) if rule else (
            Decimal('599.00') if transport_type == 'car' else Decimal('399.00') if transport_type == 'bike' else Decimal('299.00')
        )
        base_fee = Decimal(str(rule.base_fee)) if rule else Decimal('0.00')
        transport_fee = Decimal(str(rule.transport_flat_fee)) if rule and transport_type != 'companion_only' else (
            Decimal('350.00') if transport_type == 'car' else Decimal('150.00') if transport_type == 'bike' else Decimal('0.00')
        )
        platform_fee = Decimal(str(rule.platform_fee)) if rule else Decimal('49.00')
        tax_percent = Decimal(str(rule.tax_percent)) if rule else Decimal('18.00')

        companion_fee = hourly_rate * Decimal(str(duration_hours))
        subtotal = base_fee + companion_fee + transport_fee + platform_fee
        tax = (subtotal * tax_percent) / Decimal('100.00')
        total = (subtotal + tax).quantize(Decimal('1.00'))

        return {
            "duration_hours": duration_hours,
            "hourly_rate": float(hourly_rate),
            "companion_fee": float(companion_fee),
            "transport_fee": float(transport_fee),
            "platform_fee": float(platform_fee),
            "subtotal": float(subtotal),
            "tax": float(tax.quantize(Decimal('0.01'))),
            "discount": 0.0,
            "total": float(total),
            "currency": "INR",
            "breakdown_summary": f"{duration_hours} hrs companion escort + {transport_type} transport"
        }
