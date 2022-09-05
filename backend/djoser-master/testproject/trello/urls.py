from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('login/', views.CustomTokenView.as_view()),
    path('board/<id>/', views.BoardView.as_view()),
    path('edit/', views.BoardEditView.as_view()),
    path('members/', views.MemberView.as_view()),
    path('note/<id>/', views.NoteView.as_view()),
    path('whiteboard/<id>/', views.WhiteBoardView.as_view()),
]
