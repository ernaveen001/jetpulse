from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from apps.reviews.models import Review
from apps.reviews.serializers import ReviewSerializer
from apps.bookings.models import Booking

class ReviewViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        booking_id = request.data.get('booking')
        booking = Booking.objects.get(id=booking_id)

        if booking.booked_by != request.user:
            return Response({"success": False, "error": {"code": "UNAUTHORIZED", "message": "You can only review bookings you created."}}, status=status.HTTP_403_FORBIDDEN)

        if booking.status != 'COMPLETED':
            return Response({"success": False, "error": {"code": "BOOKING_NOT_COMPLETED", "message": "You cannot review a booking that is not completed."}}, status=status.HTTP_400_BAD_REQUEST)

        if not booking.assigned_companion:
            return Response({"success": False, "error": {"code": "NO_COMPANION", "message": "No companion was assigned to this booking."}}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        review = serializer.save(user=request.user, companion=booking.assigned_companion)

        # Recalculate companion rating average
        companion = booking.assigned_companion
        reviews = companion.reviews.all()
        companion.rating = round(sum(r.rating for r in reviews) / len(reviews), 2)
        companion.total_reviews = len(reviews)
        companion.save()

        return Response({
            "success": True,
            "message": "Review submitted successfully.",
            "data": ReviewSerializer(review).data
        }, status=status.HTTP_201_CREATED)
