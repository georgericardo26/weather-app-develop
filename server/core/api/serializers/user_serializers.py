import logging

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

User = get_user_model()

logger = logging.getLogger(__name__)


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def save(self, **kwargs):
        try:
            user = super(UserCreateSerializer, self).save(**kwargs)
            logger.info("User created successfully!")
            user.set_password(user.password)
            user.save()
        except ValidationError as e:
            raise serializers.ValidationError(e)
