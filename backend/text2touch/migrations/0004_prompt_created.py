# Generated by Django 4.1.7 on 2023-03-25 20:00

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('text2touch', '0003_prompt_method'),
    ]

    operations = [
        migrations.AddField(
            model_name='prompt',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
