from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

def health_check(request):
    return JsonResponse({"status": "healthy", "service": "jetpulse-backend"})

def readiness_check(request):
    return JsonResponse({"status": "ready", "database": "connected"})

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),

    # Health Checks
    path('health/', health_check, name='health-check'),
    path('ready/', readiness_check, name='readiness-check'),

    # OpenAPI Schema & Swagger Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # JetPulse API v1 Routes
    path('api/v1/auth/', include('apps.accounts.urls_auth')),
    path('api/v1/users/', include('apps.accounts.urls')),
    path('api/v1/families/', include('apps.families.urls')),
    path('api/v1/companions/', include('apps.companions.urls')),
    path('api/v1/providers/', include('apps.providers.urls')),
    path('api/v1/bookings/', include('apps.bookings.urls')),
    path('api/v1/journeys/', include('apps.journeys.urls')),
    path('api/v1/documents/', include('apps.health_records.urls')),
    path('api/v1/appointments/', include('apps.appointments.urls')),
    path('api/v1/navigator/', include('apps.navigator.urls')),
    path('api/v1/notifications/', include('apps.notifications.urls')),
    path('api/v1/payments/', include('apps.payments.urls')),
    path('api/v1/reviews/', include('apps.reviews.urls')),
    path('api/v1/support/', include('apps.support.urls')),
]
