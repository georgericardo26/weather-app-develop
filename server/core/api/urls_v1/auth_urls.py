from django.urls import path

from core.api.open_api_schema import DecoratedAuthView
from core.api.views import auth_views

urlpatterns = [

    path('', DecoratedAuthView, name='auth_user'),
    # path('', auth_views.AuthView.as_view(), name='auth_user'),
]
