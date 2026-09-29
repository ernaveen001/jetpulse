from django.db import transaction
from rest_framework.exceptions import ValidationError, PermissionDenied
from apps.bookings.models import Booking
from apps.companions.models import CompanionProfile
from apps.families.models import FamilyMember, AuditLog
from apps.payments.services import PricingService

class BookingService:

    VALID_TRANSITIONS = {
        'DRAFT': ['REQUESTED', 'CANCELLED'],
        'REQUESTED': ['SEARCHING', 'COMPANION_ASSIGNED', 'CANCELLED'],
        'SEARCHING': ['COMPANION_ASSIGNED', 'CANCELLED'],
        'COMPANION_ASSIGNED': ['CONFIRMED', 'CANCELLED'],
        'CONFIRMED': ['COMPANION_ON_THE_WAY', 'CANCELLED'],
        'COMPANION_ON_THE_WAY': ['ARRIVED', 'CANCELLED'],
        'ARRIVED': ['JOURNEY_STARTED', 'CANCELLED'],
        'JOURNEY_STARTED': ['AT_PROVIDER', 'CANCELLED'],
        'AT_PROVIDER': ['CONSULTATION_COMPLETED', 'CANCELLED'],
        'CONSULTATION_COMPLETED': ['RETURNING', 'CANCELLED'],
        'RETURNING': ['COMPLETED', 'DISPUTED'],
        'COMPLETED': [],
        'CANCELLED': [],
        'NO_SHOW': [],
        'DISPUTED': []
    }

    @staticmethod
    def create_booking(user, patient_profile, data):
        """
        Creates a booking for self or family member (remote booking).
        Validates family permission if booking for someone else.
        """
        is_remote_booking = (user.id != patient_profile.user.id)

        if is_remote_booking:
            # Check family membership and permissions
            membership = FamilyMember.objects.filter(
                patient_profile=patient_profile,
                family__owner=user
            ).first() or FamilyMember.objects.filter(
                patient_profile=patient_profile,
                family__members__patient_profile__user=user
            ).first()

            if not membership or 'BOOK_COMPANION' not in (membership.permissions or []):
                raise PermissionDenied("You do not have permission to book a companion for this family member.")

        # Calculate server-side price estimate
        price_data = PricingService.calculate_estimate(
            service_type=data.get('service_type', 'DOCTOR_VISIT'),
            transport_type=data.get('transport_type', 'car'),
            duration_hours=data.get('estimated_duration_hours', 3)
        )

        booking = Booking.objects.create(
            booked_by=user,
            patient=patient_profile,
            family=data.get('family'),
            service_type=data.get('service_type', 'DOCTOR_VISIT'),
            transport_type=data.get('transport_type', 'car'),
            pickup_address=data.get('pickup_address', ''),
            pickup_city=data.get('pickup_city', patient_profile.city or 'Varanasi'),
            destination_address=data.get('destination_address', ''),
            destination_city=data.get('destination_city', patient_profile.city or 'Varanasi'),
            provider=data.get('provider'),
            scheduled_at=data['scheduled_at'],
            estimated_duration_hours=data.get('estimated_duration_hours', 3),
            estimated_price=price_data['total'],
            status='REQUESTED',
            special_instructions=data.get('special_instructions', '')
        )

        # Audit Remote Booking if applicable
        if is_remote_booking:
            AuditLog.objects.create(
                actor=user,
                action="REMOTE_BOOKING_CREATED",
                resource_type="Booking",
                resource_id=str(booking.id),
                metadata={"booked_by": str(user.id), "patient": str(patient_profile.id), "code": booking.booking_code}
            )

        return booking

    @staticmethod
    @transaction.atomic
    def assign_companion_with_lock(booking_id, companion_id):
        """
        Assigns companion using row-level locking to prevent race conditions & double booking.
        """
        booking = Booking.objects.select_for_update().get(id=booking_id)
        companion = CompanionProfile.objects.select_for_update().get(id=companion_id)

        if companion.current_status in ['BUSY', 'ON_TRIP', 'SUSPENDED']:
            raise ValidationError(f"Companion {companion.user.first_name} is currently unavailable.")

        # Assign companion and transition state
        booking.assigned_companion = companion
        booking.status = 'COMPANION_ASSIGNED'
        booking.save()

        companion.current_status = 'BUSY'
        companion.save()

        return booking

    @classmethod
    def transition_status(cls, booking, new_status, actor=None):
        """
        Executes state machine transition with validation.
        """
        allowed = cls.VALID_TRANSITIONS.get(booking.status, [])
        if new_status not in allowed:
            raise ValidationError(f"Invalid booking status transition from {booking.status} to {new_status}.")

        booking.status = new_status
        if new_status == 'COMPLETED':
            booking.final_price = booking.estimated_price
            if booking.assigned_companion:
                booking.assigned_companion.current_status = 'AVAILABLE'
                booking.assigned_companion.save()

        booking.save()

        if actor:
            AuditLog.objects.create(
                actor=actor,
                action="BOOKING_STATUS_CHANGED",
                resource_type="Booking",
                resource_id=str(booking.id),
                metadata={"old_status": booking.status, "new_status": new_status}
            )

        return booking
