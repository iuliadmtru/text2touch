from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models import Prompt, Image


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = (
            'url', 'id',
            'username',
            'email',
            'groups',
        )


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = (
            'url', 'id',
            'name',
        )


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = (
            'id',
            'data',
        )


class PromptSerializer(serializers.HyperlinkedModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Prompt
        fields = (
            'url', 'id',
            'user',
            'created',
            'prompt',
            'pov',
            'method',
            'images',
        )
