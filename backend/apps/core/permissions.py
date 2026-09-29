from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """Permission allowing access only to the object owner."""
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'user'):
            return obj.user == request.user
        if hasattr(obj, 'owner'):
            return obj.owner == request.user
        return False

class IsVerifiedCompanion(permissions.BasePermission):
    """Permission restricting companion actions to verified companions only."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return hasattr(request.user, 'companion_profile') and request.user.companion_profile.verification_status == 'VERIFIED'

class IsPlatformAdmin(permissions.BasePermission):
    """Permission allowing access only to platform administrators."""
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (request.user.is_staff or 'PLATFORM_ADMIN' in (request.user.roles or []))
