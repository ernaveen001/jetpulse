from rest_framework import serializers
from apps.health_records.models import HealthDocument

class HealthDocumentSerializer(serializers.ModelSerializer):
    signed_download_url = serializers.SerializerMethodSerializer()

    class Meta:
        model = HealthDocument
        fields = ('id', 'patient', 'uploaded_by', 'title', 'document_type', 'file_key', 'mime_type', 'file_size_bytes', 'visibility', 'signed_download_url', 'created_at')
        read_only_fields = ('id', 'uploaded_by', 'signed_download_url', 'created_at')

    def get_signed_download_url(self, obj):
        # Stub secure signed URL generation
        return f"/api/v1/documents/{obj.id}/download/?token=mock-signed-temp-token"
