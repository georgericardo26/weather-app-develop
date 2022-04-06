import json
import logging

import requests
from django.contrib.auth import get_user_model, authenticate
from django.urls import reverse
from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from oauth2_provider import settings

from core.api.serializers.auth_serializers import AuthSerializer, AuthOutputSerializer

User = get_user_model()

logger = logging.getLogger(__name__)


class AuthView(generics.CreateAPIView):
    """
    View to authenticate user, throuth this view, we can access the oauth2
    endpoint to create and return a token.
    """
    queryset = User.objects.all()
    serializer_class = AuthSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    logger.info("Initiate user authentication...", key="UserAuth")

    def post(self, request, *args, **kwargs):

        # validate user
        username = request.data.get("username")
        password = request.data.get("password")

        logger.info("Checking if user exists...", key="UserAuth")

        # check if user exists
        get_object_or_404(User, username=username)

        user = authenticate(username=username, password=password)

        if not user:
            logger.error("Authentication user failed!", key="UserAuth")
            raise PermissionDenied

        serializer_user = self.serializer_class(instance=user)
        # serializer_user.is_valid()

        # Todo: This is not a best approach, I'll change after
        request_auth = requests.post(
            request.build_absolute_uri(reverse('oauth2_provider:token')),
            data=json.dumps(request.data)
        )

        obj = request_auth.json()
        obj["user"] = serializer_user.data

        serializer = AuthOutputSerializer(
            data=obj
        )
        serializer.is_valid()

        logger.info("User authenticated successfully!", key="UserAuth")

        return Response(serializer.data, status=status.HTTP_201_CREATED)
