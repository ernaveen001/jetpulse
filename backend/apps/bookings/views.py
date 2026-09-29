from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.bookings.models import Booking
from apps.bookings.serializers import BookingSerializer, EstimateRequestSerializer
from apps.bookings.services import BookingService
from apps.payments.services import PricingService
from apps.accounts.models import PatientProfile

class EstimatePricingView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = EstimateRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        estimate = PricingService.calculate_estimate(
            service_type=data['service_type'],
            transport_type=data['transport_type'],
            duration_hours=data['duration_hours'],
            distance_km=data['distance_km']
        )

        return Response({
            "success": True,
            "data": estimate
        })

class BookingViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookingSerializer

    def get_queryset(self):
        user = self.request.user
        # Patient gets bookings where they are booked_by OR patient profile
        patient_profile = getattr(user, 'patient_profile', None)
        if patient_profile:
            return Booking.objects.filter(booked_by=user) | Booking.objects.filter(patient=patient_profile)
        return Booking.objects.filter(booked_by=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        patient_id = request.data.get('patient')
        if patient_id:
            patient_profile = PatientProfile.objects.get(id=patient_id)
        else:
            patient_profile = getattr(request.user, 'patient_profile', None)
            if not patient_profile:
                patient_profile = PatientProfile.objects.create(user=request.user)

        booking = BookingService.create_booking(
            user=request.user,
            patient_profile=patient_profile,
            data=serializer.validated_data
        )

        return Response({
            "success": True,
            "message": "Booking request created successfully.",
            "data": BookingSerializer(booking).data
        }, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def assign_companion(self, request, pk=None):
        companion_id = request.data.get('companion_id')
        if not companion_id:
            return Response({"success": False, "error": {"code": "MISSING_COMPANION", "message": "companion_id is required."}}, status=status.HTTP_400_BAD_REQUEST)

        booking = BookingService.assign_companion_with_lock(pk, companion_id)
        return Response({
            "success": True,
            "message": "Companion assigned to booking.",
            "data": BookingSerializer(booking).data
        })

    @action(detail=True, methods=['post'])
    def transition(self, request, pk=None):
        booking = self.get_object()
        new_status = request.data.get('status')
        if not new_status:
            return Response({"success": False, "error": {"code": "MISSING_STATUS", "message": "status is required."}}, status=status.HTTP_400_BAD_REQUEST)

        booking = BookingService.transition_status(booking, new_status, actor=request.user)
        return Response({
            "success": True,
            "message": f"Booking status transitioned to {new_status}.",
            "data": BookingSerializer(booking).data
        })

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        booking = self.get_object()
        booking = BookingService.transition_status(booking, 'CANCELLED', actor=request.user)
        return Response({
            "success": True,
            "message": "Booking cancelled.",
            "data": BookingSerializer(booking).data
        })
