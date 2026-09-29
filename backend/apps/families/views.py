from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.families.models import Family, FamilyMember, FamilyInvitation, AuditLog
from apps.families.serializers import FamilySerializer, FamilyMemberSerializer, FamilyInvitationSerializer, AuditLogSerializer

class FamilyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FamilySerializer

    def get_queryset(self):
        return Family.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        family = serializer.save(owner=self.request.user)
        # Add owner as primary contact member
        if hasattr(self.request.user, 'patient_profile'):
            FamilyMember.objects.create(
                family=family,
                patient_profile=self.request.user.patient_profile,
                relationship='other',
                is_primary_contact=True,
                permissions=['VIEW_PROFILE', 'VIEW_APPOINTMENTS', 'VIEW_DOCUMENTS', 'VIEW_HEALTH_JOURNEY', 'UPLOAD_DOCUMENTS', 'BOOK_COMPANION', 'RECEIVE_UPDATES', 'MANAGE_PROFILE']
            )

    @action(detail=True, methods=['get'])
    def members(self, request, pk=None):
        family = self.get_object()
        members = family.members.all()
        return Response({
            "success": True,
            "data": FamilyMemberSerializer(members, many=True).data
        })

    @action(detail=True, methods=['post'])
    def invite(self, request, pk=None):
        family = self.get_object()
        serializer = FamilyInvitationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        invitation = serializer.save(family=family, invited_by=request.user)
        
        # Log Audit event
        AuditLog.objects.create(
            actor=request.user,
            action="FAMILY_INVITATION_SENT",
            resource_type="FamilyInvitation",
            resource_id=str(invitation.id),
            metadata={"email_or_phone": invitation.email_or_phone, "family_id": str(family.id)}
        )

        return Response({
            "success": True,
            "message": "Family invitation dispatched.",
            "data": FamilyInvitationSerializer(invitation).data
        }, status=status.HTTP_201_CREATED)

class FamilyMemberViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FamilyMemberSerializer

    def get_queryset(self):
        return FamilyMember.objects.filter(family__owner=self.request.user)

    def perform_update(self, serializer):
        instance = serializer.save()
        # Audit Log permission changes
        AuditLog.objects.create(
            actor=self.request.user,
            action="FAMILY_PERMISSIONS_UPDATED",
            resource_type="FamilyMember",
            resource_id=str(instance.id),
            metadata={"permissions": instance.permissions}
        )
