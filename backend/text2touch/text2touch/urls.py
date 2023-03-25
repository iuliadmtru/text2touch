from django.urls import path, include
from rest_framework import routers

from .views import UserViewSet, GroupViewSet, PromptViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'prompts', PromptViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
]
