from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class AuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class AuthOutputSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    expires_in = serializers.IntegerField()
    token_type = serializers.CharField()
    scope = serializers.CharField()
    refresh_token = serializers.CharField()
    user = AuthSerializer()