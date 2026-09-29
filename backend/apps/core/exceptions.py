from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    """
    Centralized DRF Exception Handler returning standard JSON error responses.
    """
    response = exception_handler(exc, context)

    if response is not None:
        error_code = getattr(exc, 'default_code', 'VALIDATION_ERROR')
        if isinstance(error_code, str):
            error_code = error_code.upper()
        else:
            error_code = 'API_ERROR'

        detail = response.data
        if isinstance(detail, dict) and 'detail' in detail:
            message = str(detail['detail'])
        elif isinstance(detail, dict):
            message = str(detail)
        elif isinstance(detail, list):
            message = ", ".join([str(item) for item in detail])
        else:
            message = str(detail)

        response.data = {
            "success": False,
            "error": {
                "code": error_code,
                "message": message
            }
        }
    else:
        # Handle unhandled server exceptions gracefully in production
        response = Response(
            {
                "success": False,
                "error": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": "An unexpected server error occurred. Please try again later."
                }
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return response
