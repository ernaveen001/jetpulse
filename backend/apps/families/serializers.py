from rest_framework import serializers
from apps.families.models import Family, FamilyMember, FamilyInvitation, AuditLog
from apps.accounts.serializers import PatientProfileSerializer

class FamilyMemberSerializer(serializers.ModelSerializer):
    patient_details = PatientProfileSerializer(source='patient_profile', read_only=True)

    class Meta:
        model = FamilyMember
        fields = ('id', 'family', 'patient_profile', 'patient_details', 'relationship', 'is_primary_contact', 'permissions', 'created_at')
        read_only_fields = ('id', 'created_at')

class FamilySerializer(serializers.ModelSerializer):
    members = FamilyMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Family
        fields = ('id', 'name', 'owner', 'members', 'created_at')
        read_only_fields = ('id', 'owner', 'created_at')

class FamilyInvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyInvitation
        fields = ('id', 'family', 'invited_by', 'email_or_phone', 'relationship', 'permissions', 'status', 'created_at')
        read_only_fields = ('id', 'invited_by', 'status', 'created_at')

class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = ('id', 'actor', 'action', 'resource_type', 'resource_id', 'ip_address', 'metadata', 'created_at')
        read_only_fields = ('id', 'created_at')
