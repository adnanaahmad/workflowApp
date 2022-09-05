from django.db import models
from django.contrib.auth.models import User


class Board(models.Model):

    task = models.CharField(max_length=500)
    status = models.CharField(max_length=3)
    member = models.ForeignKey(User, on_delete=models.CASCADE, default='1')
    # deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.task


class Note(models.Model):

    content = models.CharField(max_length=500)
    x = models.CharField(max_length=500, default='0')
    y = models.CharField(max_length=500, default='0')
    member = models.ForeignKey(User, on_delete=models.CASCADE, default='1')

    def __str__(self):
        return self.content


class WhiteBoard(models.Model):

    image = models.CharField(max_length=10000000000)
    member = models.ForeignKey(User, on_delete=models.CASCADE, default='1')

    def __str__(self):
        return self.image
