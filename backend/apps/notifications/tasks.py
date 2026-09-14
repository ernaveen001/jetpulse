from celery import shared_task
from apps.notifications.models import Notification
from apps.accounts.models import User

@shared_task
def send_async_notification(user_id, title, message, notification_type='SYSTEM', extra_data=None):
    user = User.objects.filter(id=user_id).first()
    if user:
        Notification.objects.create(
            user=user,
            type=notification_type,
            title=title,
            message=message,
            data=extra_data or {}
        )
        print(f"Async Notification sent to {user.email or user.phone}: {title}")
    return True
