from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.companions.models import CompanionProfile, CompanionQualification, CompanionAvailability
from apps.companions.serializers import CompanionProfileSerializer, CompanionQualificationSerializer, CompanionAvailabilitySerializer

class CompanionViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = CompanionProfileSerializer

    def get_queryset(self):
        qs = CompanionProfile.objects.filter(verification_status='VERIFIED')
        city = self.request.query_params.get('city')
        if city:
            qs = qs.filter(city__iexact=city)
        status_param = self.request.query_params.get('status')
        if status_param:
            qs = qs.filter(current_status=status_param.upper())
        return qs

class CompanionOperationsViewSet(viewsets.ModelViewSet):
    """
    APIs for Companion self-operations (online/offline toggle, availability slots, earnings).
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CompanionProfileSerializer

    def get_queryset(self):
        return CompanionProfile.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def toggle_status(self, request):
        profile = CompanionProfile.objects.filter(user=request.user).first()
        if not profile:
            return Response({"success": False, "error": {"code": "NOT_COMPANION", "message": "User does not have a companion profile."}}, status=status.HTTP_400_BAD_REQUEST)
        
        new_status = request.data.get('status', 'AVAILABLE')
        if new_status in ['OFFLINE', 'AVAILABLE', 'BUSY']:
            profile.current_status = new_status
            profile.save()
            return Response({
                "success": True,
                "message": f"Companion status updated to {new_status}.",
                "data": CompanionProfileSerializer(profile).data
            })
        return Response({"success": False, "error": {"code": "INVALID_STATUS", "message": "Invalid status value."}}, status=status.HTTP_400_BAD_REQUEST)
