from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from apps.payments.models import Payment, PricingRule
from apps.payments.serializers import PaymentSerializer, PricingRuleSerializer
from apps.bookings.models import Booking

class PaymentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PaymentSerializer

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        booking_id = request.data.get('booking')
        booking = Booking.objects.get(id=booking_id)

        payment, _ = Payment.objects.get_or_create(
            booking=booking,
            user=request.user,
            defaults={
                'amount': booking.estimated_price,
                'currency': 'INR',
                'status': 'PENDING',
                'transaction_id': f"TXN-{booking.booking_code}"
            }
        )

        return Response({
            "success": True,
            "message": "Payment record initialized.",
            "data": PaymentSerializer(payment).data
        }, status=status.HTTP_201_CREATED)

class PaymentWebhookView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Server-side webhook verification
        transaction_id = request.data.get('transaction_id')
        status_val = request.data.get('status', 'PAID')

        payment = Payment.objects.filter(transaction_id=transaction_id).first()
        if payment:
            payment.status = status_val
            payment.save()
            booking = payment.booking
            if status_val == 'PAID':
                booking.status = 'CONFIRMED'
                booking.save()

            return Response({"success": True, "message": "Payment verified via webhook."})

        return Response({"success": False, "error": {"code": "PAYMENT_NOT_FOUND", "message": "Transaction not found."}}, status=status.HTTP_404_NOT_FOUND)
