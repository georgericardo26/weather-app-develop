from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

from core.api.serializers.user_serializers import UserCreateSerializer

User = get_user_model()


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None
