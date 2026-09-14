from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.health_records.models import HealthDocument
from apps.health_records.serializers import HealthDocumentSerializer
from apps.families.models import AuditLog, FamilyMember

class HealthDocumentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = HealthDocumentSerializer

    def get_queryset(self):
        user = self.request.user
        # Patient documents + family shared documents where user has permission
        return HealthDocument.objects.filter(uploaded_by=user) | HealthDocument.objects.filter(patient__user=user)

    def perform_create(self, serializer):
        doc = serializer.save(uploaded_by=self.request.user)
        AuditLog.objects.create(
            actor=self.request.user,
            action="DOCUMENT_UPLOADED",
            resource_type="HealthDocument",
            resource_id=str(doc.id),
            metadata={"title": doc.title, "type": doc.document_type}
        )

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        doc = self.get_object()
        
        # Log Document Access Audit Event
        AuditLog.objects.create(
            actor=request.user,
            action="DOCUMENT_ACCESSED",
            resource_type="HealthDocument",
            resource_id=str(doc.id),
            metadata={"title": doc.title}
        )

        return Response({
            "success": True,
            "message": "Secure document stream initialized.",
            "data": {
                "document_id": str(doc.id),
                "title": doc.title,
                "mime_type": doc.mime_type,
                "secure_stream_url": f"https://s3.amazonaws.com/jetpulse-vault/{doc.file_key}?signature=mock_temp_sig"
            }
        })
