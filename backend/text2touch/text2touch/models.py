from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _


class Prompt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='prompts')

    prompt = models.CharField(_('prompt'), max_length=64)
