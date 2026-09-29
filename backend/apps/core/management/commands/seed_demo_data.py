from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from datetime import timedelta

from apps.accounts.models import User, PatientProfile
from apps.families.models import Family, FamilyMember
from apps.companions.models import CompanionProfile, CompanionQualification
from apps.providers.models import Provider, ProviderPromotion
from apps.bookings.models import Booking
from apps.journeys.models import Journey, JourneyEvent, HealthJourney, HealthJourneyEvent
from apps.health_records.models import HealthDocument
from apps.appointments.models import Appointment
from apps.support.models import FAQ
from apps.payments.models import PricingRule

class Command(BaseCommand):
    help = "Seed database with initial JetPulse demo data (clearly marked as demo content)."

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Seeding JetPulse Demo Data..."))

        # 1. Base Pricing Rules
        PricingRule.objects.get_or_create(
            service_type='DOCTOR_VISIT',
            transport_type='car',
            defaults={
                'hourly_rate': 599.00,
                'base_fee': 0.00,
                'transport_flat_fee': 350.00,
                'platform_fee': 49.00,
                'tax_percent': 18.00
            }
        )
        PricingRule.objects.get_or_create(
            service_type='DOCTOR_VISIT',
            transport_type='companion_only',
            defaults={
                'hourly_rate': 299.00,
                'base_fee': 0.00,
                'transport_flat_fee': 0.00,
                'platform_fee': 49.00,
                'tax_percent': 18.00
            }
        )

        # 2. Demo Users & Patient Profiles
        # User 1: Arjun Sharma (Son living in Bangalore)
        arjun, _ = User.objects.get_or_create(
            email='arjun.demo@jetpulse.com',
            defaults={
                'phone': '+919876543210',
                'first_name': 'Arjun',
                'last_name': 'Sharma',
                'roles': ['PATIENT', 'FAMILY_MEMBER'],
                'is_active': True,
                'is_verified': True
            }
        )
        arjun.set_password('demo1234')
        arjun.save()

        arjun_profile, _ = PatientProfile.objects.get_or_create(
            user=arjun,
            defaults={
                'gender': 'MALE',
                'blood_group': 'O+',
                'city': 'Bangalore',
                'state': 'Karnataka',
                'address': 'Koramangala 5th Block, Bangalore'
            }
        )

        # User 2: Sunita Sharma (Mom living in Varanasi)
        sunita_user, _ = User.objects.get_or_create(
            email='sunita.mom.demo@jetpulse.com',
            defaults={
                'phone': '+919811223344',
                'first_name': 'Sunita',
                'last_name': 'Sharma',
                'roles': ['PATIENT'],
                'is_active': True,
                'is_verified': True
            }
        )
        sunita_user.set_password('demo1234')
        sunita_user.save()

        sunita_profile, _ = PatientProfile.objects.get_or_create(
            user=sunita_user,
            defaults={
                'date_of_birth': '1958-05-12',
                'gender': 'FEMALE',
                'blood_group': 'B+',
                'city': 'Varanasi',
                'state': 'Uttar Pradesh',
                'address': 'B-12, Lanka Road, Varanasi',
                'emergency_contact': '+919876543210 (Son Arjun)'
            }
        )

        # 3. Family Relationship (Bangalore Son -> Varanasi Mom)
        family, _ = Family.objects.get_or_create(
            name='Sharma Family Healthcare',
            owner=arjun
        )

        FamilyMember.objects.get_or_create(
            family=family,
            patient_profile=sunita_profile,
            defaults={
                'relationship': 'mother',
                'is_primary_contact': True,
                'permissions': ['VIEW_PROFILE', 'VIEW_APPOINTMENTS', 'VIEW_DOCUMENTS', 'VIEW_HEALTH_JOURNEY', 'UPLOAD_DOCUMENTS', 'BOOK_COMPANION', 'RECEIVE_UPDATES']
            }
        )

        # 4. Verified Companion (Rajesh Kumar in Varanasi)
        companion_user, _ = User.objects.get_or_create(
            email='rajesh.companion.demo@jetpulse.com',
            defaults={
                'phone': '+919988776655',
                'first_name': 'Rajesh',
                'last_name': 'Kumar',
                'roles': ['COMPANION'],
                'is_active': True,
                'is_verified': True
            }
        )
        companion_user.set_password('demo1234')
        companion_user.save()

        companion_profile, _ = CompanionProfile.objects.get_or_create(
            user=companion_user,
            defaults={
                'verification_status': 'VERIFIED',
                'training_status': 'COMPLETED',
                'current_status': 'AVAILABLE',
                'rating': 4.9,
                'total_reviews': 142,
                'years_experience': 4,
                'languages': ['Hindi', 'English'],
                'bio': 'CPR-trained healthcare escort specializing in elderly & outpatient assistance.',
                'city': 'Varanasi',
                'transport_options': ['companion_only', 'car']
            }
        )

        CompanionQualification.objects.get_or_create(
            companion=companion_profile,
            qualification_type='CPR & First Aid Certification',
            defaults={
                'institution': 'Indian Red Cross Society',
                'certificate_number': 'IRC-2024-8819',
                'verification_status': 'VERIFIED',
                'verified_at': timezone.now()
            }
        )

        # 5. Providers (Hospitals & Diagnostic Labs)
        apollo, _ = Provider.objects.get_or_create(
            name='Apollo Spectra Specialty Hospital',
            type='HOSPITAL',
            city='Varanasi',
            defaults={
                'description': 'Multi-specialty hospital with fast-track OPD and TPA insurance desk.',
                'phone': '+915422233445',
                'address': 'Ravindrapuri Main Rd, Varanasi',
                'state': 'Uttar Pradesh',
                'pincode': '221005',
                'services': ['Cardiology', 'Orthopedics', 'OPD', 'TPA Cashless'],
                'is_verified': True,
                'rating': 4.8
            }
        )

        max_clinic, _ = Provider.objects.get_or_create(
            name='Max Super Specialty Clinic [Demo Sponsored]',
            type='CLINIC',
            city='Varanasi',
            defaults={
                'description': 'Specialty clinic offering instant doctor consultations.',
                'phone': '+915429988776',
                'address': 'Maldahiya, Varanasi',
                'state': 'Uttar Pradesh',
                'pincode': '221002',
                'services': ['General Physician', 'Pathology'],
                'is_verified': True,
                'rating': 4.9
            }
        )

        # Sponsored Promotion Distinction
        ProviderPromotion.objects.get_or_create(
            provider=max_clinic,
            defaults={
                'start_date': timezone.now().date(),
                'end_date': (timezone.now() + timedelta(days=30)).date(),
                'campaign_status': 'ACTIVE',
                'label': 'SPONSORED'
            }
        )

        # 6. Booking (Bangalore Arjun booking for Mom Sunita in Varanasi)
        booking, _ = Booking.objects.get_or_create(
            booking_code='JP-2026-DEMO1',
            defaults={
                'booking_type': 'INSTANT',
                'booked_by': arjun,
                'patient': sunita_profile,
                'family': family,
                'service_type': 'DOCTOR_VISIT',
                'transport_type': 'car',
                'pickup_address': 'B-12, Lanka Road, Varanasi',
                'pickup_city': 'Varanasi',
                'destination_address': 'Apollo Spectra Hospital, Ravindrapuri, Varanasi',
                'destination_city': 'Varanasi',
                'provider': apollo,
                'assigned_companion': companion_profile,
                'scheduled_at': timezone.now(),
                'estimated_duration_hours': 3,
                'status': 'AT_PROVIDER',
                'estimated_price': 1247.00,
                'special_instructions': 'Mom has mild knee osteoarthritis. Please assist with wheelchair at hospital gate.'
            }
        )

        # Live Journey & Events
        journey, _ = Journey.objects.get_or_create(
            booking=booking,
            defaults={
                'started_at': timezone.now() - timedelta(minutes=45),
                'current_status': 'AT_PROVIDER',
                'current_latitude': 25.3176,
                'current_longitude': 82.9739
            }
        )

        JourneyEvent.objects.get_or_create(
            journey=journey,
            event_type='COMPANION_ARRIVED',
            defaults={'location_name': 'B-12 Lanka Road, Varanasi', 'metadata': {'time': '10:05 AM'}}
        )
        JourneyEvent.objects.get_or_create(
            journey=journey,
            event_type='REACHED_HOSPITAL',
            defaults={'location_name': 'Apollo Spectra OPD Token Desk #42', 'metadata': {'time': '10:45 AM'}}
        )

        # 7. Health Journey Thread (Mom - Knee Treatment)
        health_journey, _ = HealthJourney.objects.get_or_create(
            patient=sunita_profile,
            title='Mom — Knee Osteoarthritis Therapy',
            defaults={'description': 'Chronological treatment timeline for Sunita Sharma', 'status': 'ACTIVE'}
        )

        HealthJourneyEvent.objects.get_or_create(
            journey=health_journey,
            title='Initial Orthopedic Consultation',
            defaults={
                'event_type': 'DOCTOR_VISIT',
                'description': 'Dr. V. K. Gupta examined bilateral knee inflammation. Diagnostic X-Ray & MRI requested.',
                'created_by': arjun
            }
        )

        # 8. FAQs
        FAQ.objects.get_or_create(
            question='Can I book a JetPulse companion from another city for my family?',
            defaults={
                'answer': 'Yes. JetPulse explicitly supports remote family booking. A person sitting in Bangalore can arrange assistance for a parent sitting in Varanasi or Jaipur.',
                'category': 'Booking'
            }
        )
        FAQ.objects.get_or_create(
            question='Is Care Navigator an AI doctor?',
            defaults={
                'answer': 'No. JetPulse Care Navigator is a non-clinical advisory healthcare navigation tool. It provides informational and pathway guidance to discover verified local providers, but does not diagnose medical conditions.',
                'category': 'Care Navigator'
            }
        )

        self.stdout.write(self.style.SUCCESS("✓ JetPulse Demo Data successfully seeded!"))
