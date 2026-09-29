import pytest
from django.utils import timezone
from rest_framework.test import APIClient
from apps.accounts.models import User, PatientProfile
from apps.families.models import Family, FamilyMember
from apps.companions.models import CompanionProfile
from apps.bookings.models import Booking
from apps.bookings.services import BookingService
from apps.payments.services import PricingService

@pytest.mark.django_db
class TestJetPulseBackend:

    def setup_method(self):
        self.client = APIClient()

    def test_registration_and_jwt_login(self):
        # Test Registration
        reg_response = self.client.post('/api/v1/auth/register/', {
            'email': 'arjun.test@jetpulse.com',
            'password': 'Password123!',
            'first_name': 'Arjun',
            'last_name': 'Test'
        }, format='json')

        assert reg_response.status_code == 201
        assert reg_response.data['success'] is True
        assert 'access' in reg_response.data['data']

        # Test JWT Login
        login_response = self.client.post('/api/v1/auth/login/', {
            'email_or_phone': 'arjun.test@jetpulse.com',
            'password': 'Password123!'
        }, format='json')

        assert login_response.status_code == 200
        assert login_response.data['success'] is True
        assert 'access' in login_response.data['data']

    def test_pricing_engine_calculation(self):
        estimate = PricingService.calculate_estimate(
            service_type='DOCTOR_VISIT',
            transport_type='car',
            duration_hours=3,
            distance_km=12.4
        )

        assert estimate['duration_hours'] == 3
        assert estimate['companion_fee'] == 1797.0
        assert estimate['transport_fee'] == 350.0
        assert estimate['total'] > 0

    def test_remote_family_booking_and_state_machine(self):
        # Create User A (Bangalore Son)
        son = User.objects.create_user(email='son@test.com', password='pass', first_name='Son')
        
        # Create User B (Varanasi Mom)
        mom_user = User.objects.create_user(email='mom@test.com', password='pass', first_name='Mom')
        mom_profile = PatientProfile.objects.create(user=mom_user, city='Varanasi')

        # Setup Family Relationship with BOOK_COMPANION Permission
        family = Family.objects.create(name='Test Family', owner=son)
        FamilyMember.objects.create(
            family=family,
            patient_profile=mom_profile,
            relationship='mother',
            permissions=['BOOK_COMPANION', 'VIEW_HEALTH_JOURNEY']
        )

        # Create Remote Booking
        booking = BookingService.create_booking(
            user=son,
            patient_profile=mom_profile,
            data={
                'service_type': 'DOCTOR_VISIT',
                'transport_type': 'car',
                'pickup_address': 'Lanka, Varanasi',
                'destination_address': 'Apollo Spectra, Varanasi',
                'scheduled_at': timezone.now(),
                'estimated_duration_hours': 3
            }
        )

        assert booking.booked_by == son
        assert booking.patient == mom_profile
        assert booking.status == 'REQUESTED'

        # Test Valid State Transitions
        booking = BookingService.transition_status(booking, 'SEARCHING')
        assert booking.status == 'SEARCHING'

        # Test Invalid Transition Raises Validation Error
        with pytest.raises(Exception):
            BookingService.transition_status(booking, 'COMPLETED')
