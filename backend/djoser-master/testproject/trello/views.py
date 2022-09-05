from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from djoser import views
from djoser import utils
from .models import Board, Note, WhiteBoard
from .serializers import BoardSerializer, UserSerializer, NoteSerializer, WhiteBoardSerializer
from django.contrib.auth.models import User
from djoser.conf import settings
import base64
from django.core.files.base import ContentFile



class CustomTokenView(views.TokenCreateView):
    serializer_class = settings.SERIALIZERS.token_create
    permission_classes = settings.PERMISSIONS.token_create

    def _action(self, serializer):
        try:
            token = utils.login_user(self.request, serializer.user)
            token_serializer_class = settings.SERIALIZERS.token
            user = User.objects.get(username=serializer.data['username'])
            data = token_serializer_class(token).data
            data['id'] = user.id
            responseData = makeResponse(data, 200, {'Success'})
        except:
            responseData = makeResponse(data, 400, {'Failed to login'})

        return Response(responseData)


class BoardView(APIView):
    def get(*args, **kwargs):
        board = Board.objects.filter(member_id=kwargs['id'])
        serializer = BoardSerializer(board, many=True)
        dict_a = serializer.data
        fx = filter(lambda x: x['status'] == "TD", dict_a)
        fy = filter(lambda x: x['status'] == "D", dict_a)
        fz = filter(lambda x: x['status'] == "T", dict_a)
        ax = list(fx)
        ay = list(fy)
        az = list(fz)
        dict_send = {'TD': ax, 'D': ay, 'T': az}
        return Response(dict_send, status=200)

    def patch(self, request, *args, **kwargs):  # this should be "put"
        for i in request.data['TD']:
            task = Board.objects.get(task=i, member_id=kwargs['id'])
            task.status = 'TD'
            task.save()
        for i in request.data['D']:
            task = Board.objects.get(task=i, member_id=kwargs['id'])
            task.status = 'D'
            task.save()
        for i in request.data['T']:
            task = Board.objects.get(task=i, member_id=kwargs['id'])
            task.status = 'T'
            task.save()
        return Response('Success', status=200)

    def post(self, request, *args, **kwargs):
        board = Board(
            task=request.data['task'],
            status=request.data['status'],
            member_id=request.data['member_id'],
        )
        board.save()
        return Response('Success', status=200)

    def put(self, request, *args, **kwargs):  # this should be "delete"
        print('moews')
        board = Board.objects.filter(
            task=request.data['task'],
            status=request.data['status'],
            member_id=request.data['member_id']
        ).delete()
        return Response('Success', status=200)


class BoardEditView(APIView):
    def patch(self, request, *args, **kwargs):
        board = Board.objects.filter(
            task=request.data['task'],
            status=request.data['status'],
            member_id=request.data['member_id']
        ).delete()
        b = Board(
            task=request.data['newTask'],
            status=request.data['newStatus'],
            member_id=request.data['member_id'],
        )
        b.save()
        return Response('Success', status=200)


class NoteView(APIView):
    def get(*args, **kwargs):
        note = Note.objects.filter(member_id=kwargs['id'])
        serializer = NoteSerializer(note, many=True)
        return Response(serializer.data, status=200)

    def post(self, request, *args, **kwargs):
        note = Note(
            content=request.data['content'],
            member_id=request.data['member_id'],
            x=0,
            y=0,
        )
        note.save()

        return Response(note.id, status=200)

    def patch(self, request, *args, **kwargs):
        note = Note.objects.get(id=request.data['id'])
        note.x = request.data['x']
        note.y = request.data['y']
        note.content = request.data['content']
        note.save()
        return Response('Success', status=200)


class WhiteBoardView(APIView):

    def get(*args, **kwargs):
        whiteboard = WhiteBoard.objects.get(member_id=kwargs['id'])
        return Response(whiteboard.image, status=200)

    def post(self, request, *args, **kwargs):
        whiteboard = WhiteBoard(
            image=request.data['image'],
            member_id=request.data['member_id']
        )
        whiteboard.save()
        return Response(whiteboard.id, status=200)


class MemberView(APIView):
    def get(*args, **kwargs):
        # member = User.objects.all();
        b = Board.objects.filter(member_id=5)
        # print(b.member_id)
        serializer = BoardSerializer(b, many=True)
        return Response(serializer.data, status=200)


def makeResponse(data, code, message):
    responseDetail = {}
    responseDetail["code"] = code
    responseDetail["message"] = message
    apiResponse = {"data": data, "responseDetails": responseDetail}
    return apiResponse
