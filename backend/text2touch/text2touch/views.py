from django.contrib.auth.models import Group, User
from rest_framework import viewsets, permissions

from .models import Prompt, Image
from .serializers import UserSerializer, GroupSerializer, PromptSerializer
from .services import GPT3Service, DALLE2Service


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(id=self.request.user.id)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class PromptViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        super().perform_create(serializer)
        instance = serializer.instance

        imgs = None
        if instance.method == 'GPT3':
            imgs = GPT3Service.generate(instance.prompt)
        elif instance.method == 'DALLE2':
            imgs = DALLE2Service.generate(instance.prompt)

        for img in imgs:
            Image.objects.create(prompt=instance, data=img)
