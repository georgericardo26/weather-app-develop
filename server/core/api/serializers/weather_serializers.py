import logging

from rest_framework import serializers

from core.models import HistoryWeatherModel

logger = logging.getLogger(__name__)


class WeatherChildMain(serializers.Serializer):
    temp = serializers.FloatField()
    temp_min = serializers.FloatField()
    temp_max = serializers.FloatField()


class WeatherOutputSerializer(serializers.Serializer):
    main = WeatherChildMain(required=True)
    name = serializers.CharField()


class HistoryWeatherSerializer(serializers.ModelSerializer):

    class Meta:
        model = HistoryWeatherModel
        fields = '__all__'
