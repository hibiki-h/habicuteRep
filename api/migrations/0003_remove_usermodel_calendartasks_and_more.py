# Generated by Django 5.1.7 on 2025-05-31 03:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_calendartaskmodel_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usermodel',
            name='calendartasks',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='tasks',
        ),
        migrations.AddField(
            model_name='calendartaskmodel',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='calendartask', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='taskmodel',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='task', to=settings.AUTH_USER_MODEL),
        ),
    ]
