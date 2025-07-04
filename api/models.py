import uuid
from django.db import models
from django.dispatch import receiver
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.auth.models import AbstractUser
from django_rest_passwordreset.signals import reset_password_token_created

from django.conf import settings


class UserModel(AbstractUser):
    username = models.CharField(unique=True, max_length=100, default=1)
    email = models.EmailField(unique=True, default="h.hatori0603@gmail.com")


class BaseTaskModel(models.Model):

    STATUS_CHOICES = [
        ("Planned", "Planned"),
        ("Done", "Done"),
        ("Failed", "Failed"),
    ]

    BGCOLOR_CHOISES = [
        ("#696969", "Planned_color"),
        ("#c11336", "Done_color"),
        ("#0000cd", "Failed_color"),
    ]

    # content

    id = models.UUIDField(
        max_length=1000, primary_key=True, blank=False, null=False)
    title = models.CharField(max_length=100, null=True)
    title_reason = models.CharField(max_length=100, null=True)
    achievement_title = models.CharField(max_length=100, null=True)
    when_if = models.CharField(max_length=100, null=True)
    when_then = models.CharField(max_length=100, null=True)
    obstacle_if = models.CharField(max_length=100, null=True)
    obstacle_then = models.CharField(max_length=100, null=True)
    backgroundColor = models.CharField(
        max_length=10, choices=BGCOLOR_CHOISES, null=True)
    status = models.CharField(
        max_length=7, choices=STATUS_CHOICES, null=True)

    # date
    start = models.DateTimeField(null=True)
    end = models.DateTimeField(null=True)
    allDay = models.BooleanField(null=True)

    # create date
    created = models.DateTimeField(auto_now_add=True, null=True)
    modified = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.title


class TaskModel(BaseTaskModel):
    user = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="task", null=True)

    class Meta:
        verbose_name = 'TaskModel'


class CalendarTaskModel(BaseTaskModel):
    user = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="calendartask", null=True)

    class Meta:
        verbose_name = 'CalendarTaskModel'


# user password reset
@receiver(reset_password_token_created)
def reset_password_token_created(reset_password_token, *args, **kwargs):
    sitelink = "http://localhost:5173/"
    token = f"{reset_password_token.key}"
    full_link = str(sitelink)+str("password-reset/")+str(token)

    context = {
        "full_link": full_link,
        "email_address": reset_password_token.user.email
    }

    html_message = render_to_string(
        "registration/password_reset_mail.html", context=context)
    plain_message = strip_tags(html_message)

    msg = EmailMultiAlternatives(
        subject=f"Request for resetting password for {reset_password_token.user.email}",
        body=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[reset_password_token.user.email],
    )

    msg.attach_alternative(html_message, "text/html")
    msg.send()
