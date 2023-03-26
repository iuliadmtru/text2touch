from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _


class Prompt(models.Model):
    class Method(models.TextChoices):
        GPT3 = 'GPT3', _('GPT-3'),
        DALLE2 = 'DALLE2', _('DALL·E 2'),

    class PointOfView(models.TextChoices):
        SIDE = 'SIDE', _('Side view'),
        FRONT = 'FRONT', _('Front view'),
        TOP = 'TOP', _('Top view'),

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='prompts')

    prompt = models.CharField(_('prompt'), max_length=64)
    pov = models.CharField(_('point of view'), max_length=16, choices=PointOfView.choices, default=PointOfView.SIDE)
    method = models.CharField(_('method'), max_length=8, choices=Method.choices)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '"{}"'.format(self.prompt)


class Image(models.Model):
    prompt = models.ForeignKey(Prompt, on_delete=models.CASCADE, related_name='images')

    data = models.TextField()

    def __str__(self):
        return '{} <{}>'.format(self.prompt, self.id)
