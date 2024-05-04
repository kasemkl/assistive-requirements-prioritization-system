from rest_framework.permissions import BasePermission


class IsSystemAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.type == 1  

class IsProductOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.type == 2  