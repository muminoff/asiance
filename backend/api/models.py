from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils.text import Truncator
import uuid


class Author(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    avatar = models.URLField(null=True)
    location = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.role})"


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(Author, on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=200)
    body = models.TextField(null=True, blank=True)
    tags = ArrayField(models.CharField(max_length=200), blank=True)
    image_url = models.URLField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.title:
            title_trunc = Truncator(self.title).words(8)
            return f"{title_trunc} by {self.author.name}"

        return self.pk
