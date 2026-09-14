from rest_framework import serializers
from apps.accounts.models import User, PatientProfile

class UserSerializer(serializers.ModelModelSerializer if hasattr(serializers, 'ModelModelSerializer') else serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone', 'email', 'first_name', 'last_name', 'date_of_birth', 'gender', 'profile_photo', 'roles', 'is_active', 'is_verified', 'created_at')
        read_only_fields = ('id', 'is_active', 'is_verified', 'created_at')

class PatientProfileSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)

    class Meta:
        model = PatientProfile
        fields = ('id', 'user', 'user_details', 'date_of_birth', 'gender', 'blood_group', 'preferred_language', 'emergency_contact', 'address', 'city', 'state', 'pincode', 'latitude', 'longitude', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    role = serializers.CharField(default='PATIENT')

    def validate(self, attrs):
        if not attrs.get('email') and not attrs.get('phone'):
            raise serializers.ValidationError("Either email or phone must be provided.")
        return attrs

class LoginSerializer(serializers.Serializer):
    email_or_phone = serializers.CharField()
    password = serializers.CharField(write_only=True)

class OTPRequestSerializer(serializers.Serializer):
    phone = serializers.CharField()

class OTPVerifySerializer(serializers.Serializer):
    phone = serializers.CharField()
    otp = serializers.CharField(max_length=6)
