from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse, HttpResponse
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView


def api_root(request):
    """
    Root endpoint for JetPulse Backend.
    Provides API directory in JSON or an interactive landing page for browser requests.
    """
    accept = request.headers.get('Accept', '')
    if 'text/html' in accept and 'application/json' not in accept:
        html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JetPulse Healthcare API</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #090d16;
            --card-bg: rgba(255, 255, 255, 0.04);
            --card-border: rgba(255, 255, 255, 0.08);
            --primary: #0ea5e9;
            --primary-gradient: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);
            --accent-green: #10b981;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: var(--bg);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background-image: 
                radial-gradient(circle at 15% 20%, rgba(14, 165, 233, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 85% 80%, rgba(16, 185, 129, 0.12) 0%, transparent 40%);
        }
        .container {
            max-width: 860px;
            width: 100%;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 24px;
            padding: 40px;
            backdrop-filter: blur(20px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 32px;
            flex-wrap: wrap;
            gap: 16px;
        }
        .brand {
            display: flex;
            align-items: center;
            gap: 14px;
        }
        .logo-icon {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            background: var(--primary-gradient);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 800;
            color: white;
            box-shadow: 0 10px 20px -5px rgba(14, 165, 233, 0.4);
        }
        .brand h1 {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.02em;
        }
        .brand p {
            font-size: 13px;
            color: var(--text-muted);
        }
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 14px;
            border-radius: 999px;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.25);
            color: #34d399;
            font-size: 13px;
            font-weight: 600;
        }
        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 10px #10b981;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.85); }
        }
        .hero {
            margin-bottom: 32px;
        }
        .hero h2 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            line-height: 1.3;
        }
        .hero p {
            color: var(--text-muted);
            font-size: 15px;
            line-height: 1.6;
        }
        .quick-actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 36px;
        }
        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 14px 20px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
        }
        .btn-primary {
            background: var(--primary-gradient);
            color: #ffffff;
            box-shadow: 0 8px 20px -4px rgba(14, 165, 233, 0.35);
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px -4px rgba(14, 165, 233, 0.45);
        }
        .btn-secondary {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--card-border);
            color: var(--text-main);
        }
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }
        .endpoints-section {
            border-top: 1px solid var(--card-border);
            padding-top: 28px;
        }
        .endpoints-title {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--text-muted);
            margin-bottom: 16px;
            font-weight: 700;
        }
        .endpoints-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 10px;
        }
        .endpoint-chip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--card-border);
            border-radius: 10px;
            font-size: 13px;
            color: #cbd5e1;
            text-decoration: none;
            transition: all 0.15s ease;
            font-family: monospace;
        }
        .endpoint-chip:hover {
            background: rgba(14, 165, 233, 0.08);
            border-color: rgba(14, 165, 233, 0.3);
            color: #38bdf8;
        }
        .badge-method {
            font-size: 10px;
            font-weight: 700;
            background: rgba(14, 165, 233, 0.2);
            color: #38bdf8;
            padding: 2px 6px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="brand">
                <div class="logo-icon">JP</div>
                <div>
                    <h1>JetPulse Healthcare API</h1>
                    <p>Enterprise REST Backend v1.0.0</p>
                </div>
            </div>
            <div class="badge">
                <div class="status-dot"></div>
                API Engine Healthy
            </div>
        </div>

        <div class="hero">
            <h2>Welcome to JetPulse Core Services</h2>
            <p>The backend API is running smoothly. Explore interactive documentation, inspect the OpenAPI schema, or access the admin control panel below.</p>
        </div>

        <div class="quick-actions">
            <a href="/api/docs/" class="btn btn-primary">📖 Swagger Docs UI</a>
            <a href="/api/redoc/" class="btn btn-secondary">📚 ReDoc Reference</a>
            <a href="/admin/" class="btn btn-secondary">🛠️ Admin Portal</a>
            <a href="/health/" class="btn btn-secondary">💓 Health Status</a>
        </div>

        <div class="endpoints-section">
            <div class="endpoints-title">Key API v1 Resource Routes</div>
            <div class="endpoints-grid">
                <a href="/api/v1/auth/" class="endpoint-chip"><span>/api/v1/auth</span> <span class="badge-method">AUTH</span></a>
                <a href="/api/v1/users/" class="endpoint-chip"><span>/api/v1/users</span> <span class="badge-method">REST</span></a>
                <a href="/api/v1/families/" class="endpoint-chip"><span>/api/v1/families</span> <span class="badge-method">REST</span></a>
                <a href="/api/v1/companions/" class="endpoint-chip"><span>/api/v1/companions</span> <span class="badge-method">REST</span></a>
                <a href="/api/v1/providers/" class="endpoint-chip"><span>/api/v1/providers</span> <span class="badge-method">REST</span></a>
                <a href="/api/v1/bookings/" class="endpoint-chip"><span>/api/v1/bookings</span> <span class="badge-method">REST</span></a>
                <a href="/api/v1/journeys/" class="endpoint-chip"><span>/api/v1/journeys</span> <span class="badge-method">REST</span></a>
                <a href="/api/v1/appointments/" class="endpoint-chip"><span>/api/v1/appointments</span> <span class="badge-method">REST</span></a>
                <a href="/api/v1/navigator/" class="endpoint-chip"><span>/api/v1/navigator</span> <span class="badge-method">AI</span></a>
                <a href="/api/v1/notifications/" class="endpoint-chip"><span>/api/v1/notifications</span> <span class="badge-method">ALERT</span></a>
                <a href="/api/v1/payments/" class="endpoint-chip"><span>/api/v1/payments</span> <span class="badge-method">PAY</span></a>
                <a href="/api/v1/support/" class="endpoint-chip"><span>/api/v1/support</span> <span class="badge-method">HELP</span></a>
            </div>
        </div>
    </div>
</body>
</html>"""
        return HttpResponse(html_content)

    return JsonResponse({
        "name": "JetPulse Healthcare Platform API",
        "version": "1.0.0",
        "status": "online",
        "documentation": {
            "swagger": request.build_absolute_uri('/api/docs/'),
            "redoc": request.build_absolute_uri('/api/redoc/'),
            "openapi_schema": request.build_absolute_uri('/api/schema/')
        },
        "health": {
            "health_check": request.build_absolute_uri('/health/'),
            "readiness_check": request.build_absolute_uri('/ready/')
        },
        "endpoints": {
            "auth": request.build_absolute_uri('/api/v1/auth/'),
            "users": request.build_absolute_uri('/api/v1/users/'),
            "families": request.build_absolute_uri('/api/v1/families/'),
            "companions": request.build_absolute_uri('/api/v1/companions/'),
            "providers": request.build_absolute_uri('/api/v1/providers/'),
            "bookings": request.build_absolute_uri('/api/v1/bookings/'),
            "journeys": request.build_absolute_uri('/api/v1/journeys/'),
            "documents": request.build_absolute_uri('/api/v1/documents/'),
            "appointments": request.build_absolute_uri('/api/v1/appointments/'),
            "navigator": request.build_absolute_uri('/api/v1/navigator/'),
            "notifications": request.build_absolute_uri('/api/v1/notifications/'),
            "payments": request.build_absolute_uri('/api/v1/payments/'),
            "reviews": request.build_absolute_uri('/api/v1/reviews/'),
            "support": request.build_absolute_uri('/api/v1/support/'),
            "admin": request.build_absolute_uri('/admin/')
        }
    })


def health_check(request):
    return JsonResponse({"status": "healthy", "service": "jetpulse-backend"})


def readiness_check(request):
    return JsonResponse({"status": "ready", "database": "connected"})


urlpatterns = [
    # Root API Landing / Explorer
    path('', api_root, name='api-root'),

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
