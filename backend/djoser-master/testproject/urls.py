from django.conf.urls import include, url
from django.urls import path

from rest_framework.documentation import include_docs_urls

urlpatterns = (
    path('users/', include('trello.urls')),
    url(r"^auth/", include("djoser.urls.base")),
    url(r"^auth/", include("djoser.urls.authtoken")),
    url(r"^auth/", include("djoser.urls.jwt")),
    url(r"^auth/", include("djoser.social.urls"))
)
