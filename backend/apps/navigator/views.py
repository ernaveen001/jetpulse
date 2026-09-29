from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.navigator.models import CareJourney, NavigatorMessage
from apps.navigator.serializers import CareJourneySerializer, NavigatorMessageSerializer, QueryPromptSerializer
from apps.navigator.services import NavigatorService

class CareJourneyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CareJourneySerializer

    def get_queryset(self):
        return CareJourney.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def query(self, request, pk=None):
        journey = self.get_object()
        serializer = QueryPromptSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user_msg_text = serializer.validated_data['message']
        attachments = serializer.validated_data.get('attachments', [])
        city = serializer.validated_data.get('city', 'Bangalore')

        # Save user message
        user_msg = NavigatorMessage.objects.create(
            care_journey=journey,
            sender='USER',
            message=user_msg_text,
            attachments=attachments
        )

        # Process Advisory Navigation
        nav_result = NavigatorService.process_navigation_query(
            user=request.user,
            care_journey=journey,
            prompt_text=user_msg_text,
            attachments=attachments,
            city=city
        )

        # Save AI Advisory Message
        ai_msg = NavigatorMessage.objects.create(
            care_journey=journey,
            sender='NAVIGATOR_AI',
            message=nav_result['message'],
            recommended_pathway=nav_result['pathway'],
            is_urgent=nav_result['is_urgent'],
            disclaimer=nav_result['disclaimer']
        )

        return Response({
            "success": True,
            "data": {
                "user_message": NavigatorMessageSerializer(user_msg).data,
                "ai_response": NavigatorMessageSerializer(ai_msg).data,
                "recommended_providers": nav_result['recommended_providers']
            }
        }, status=status.HTTP_201_CREATED)
