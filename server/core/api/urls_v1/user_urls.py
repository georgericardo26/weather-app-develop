from django.urls import path
from core.api.views import user_views

urlpatterns = [
    path('create/', user_views.UserCreateView.as_view(), name='create_user'),
]
