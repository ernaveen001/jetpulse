from rest_framework import viewsets, permissions
from apps.providers.models import Provider
from apps.providers.serializers import ProviderSerializer

class ProviderViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProviderSerializer

    def get_queryset(self):
        qs = Provider.objects.filter(is_active=True)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(name__icontains=search) | qs.filter(city__icontains=search) | qs.filter(services__icontains=search)
        
        city = self.request.query_params.get('city')
        if city:
            qs = qs.filter(city__iexact=city)

        provider_type = self.request.query_params.get('type')
        if provider_type:
            qs = qs.filter(type__iexact=provider_type)

        return qs
