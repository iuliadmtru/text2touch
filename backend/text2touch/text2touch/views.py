from django.contrib.auth.models import Group, User
from rest_framework import viewsets, permissions

from .models import Prompt
from .serializers import UserSerializer, GroupSerializer, PromptSerializer
from .services.dalle2 import OpenAIService


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


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

    def perform_create(self, serializer):
        method = serializer.validated_data['method']
        prompt = serializer.validated_data['prompt']

        if method == 'GPT3':
            print('TODO: call GPT3 for SVGs')
        elif method == 'DALLE2':
            print('TODO: call DALLE2 for PNGs')
            pngs = OpenAIService.generate(prompt)
            print(pngs)

            print('TODO: convert PNGs to SVGs')

        super().perform_create(serializer)
