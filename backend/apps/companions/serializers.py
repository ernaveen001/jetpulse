from rest_framework import serializers
from apps.companions.models import CompanionProfile, CompanionQualification, CompanionAvailability
from apps.accounts.serializers import UserSerializer

class CompanionQualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanionQualification
        fields = ('id', 'qualification_type', 'institution', 'certificate_number', 'verification_status', 'verified_at')
        read_only_fields = ('id', 'verification_status', 'verified_at')

class CompanionProfileSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)
    verified_qualifications = serializers.SerializerMethodSerializer()

    class Meta:
        model = CompanionProfile
        fields = (
            'id', 'user', 'user_details', 'verification_status', 'training_status', 'current_status',
            'rating', 'total_reviews', 'years_experience', 'languages', 'bio', 'service_radius_km',
            'city', 'current_latitude', 'current_longitude', 'transport_options', 'profile_photo',
            'verified_qualifications', 'created_at'
        )
        read_only_fields = ('id', 'rating', 'total_reviews', 'verification_status', 'created_at')

    def get_verified_qualifications(self, obj):
        verified_qs = obj.qualifications.filter(verification_status='VERIFIED')
        return CompanionQualificationSerializer(verified_qs, many=True).data

class CompanionAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanionAvailability
        fields = ('id', 'companion', 'date', 'start_time', 'end_time', 'is_available')
        read_only_fields = ('id',)
