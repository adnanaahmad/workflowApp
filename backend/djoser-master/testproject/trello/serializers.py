from rest_framework import serializers
from .models import Board, Note, WhiteBoard
from django.contrib.auth.models import User


class BoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = ('task', 'status')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'


class WhiteBoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = WhiteBoard
        fields = ('image', 'member_id')
