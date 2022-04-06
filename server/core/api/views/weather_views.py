from rest_framework import generics, permissions, serializers
from rest_framework.exceptions import NotAuthenticated, NotFound
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination

from core.models import HistoryWeatherModel
from core.api.serializers.weather_serializers import (WeatherOutputSerializer,
                                                      HistoryWeatherSerializer)
from common.integrations.open_weather.client import OpenWeatherAPIClient
from common.integrations.open_weather.exception import (ValidationError,
                                                        UnauthorizedError)


class WeatherView(generics.ListAPIView):
    serializer_class = WeatherOutputSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):

        params = request.query_params

        if "q" in params or "zip" in params:
            try:
                weather_response = OpenWeatherAPIClient().search_weather(
                    query=params)

                serializer_weather = self.serializer_class(
                    data=weather_response)
                serializer_weather.is_valid(raise_exception=True)

                # Save in HistoryWeatherModel
                HistoryWeatherModel.objects.create(
                    name_city=serializer_weather.data["name"],
                    temp=serializer_weather.data["main"]["temp"])

                return Response(
                    data=serializer_weather.data,
                    status=status.HTTP_200_OK)

            except ValidationError:
                raise serializers.ValidationError()

            except UnauthorizedError:
                raise NotAuthenticated()

            except NotFound:
                raise NotFound()

        response_data = {
            "code": "missing_query_parameters",
            "message": "One or more query parameter could not be validated."
        }

        return Response(data=response_data, status=status.HTTP_404_NOT_FOUND)


class HistoryWeatherView(generics.ListAPIView):
    serializer_class = HistoryWeatherSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = HistoryWeatherModel.objects.all()
    pagination_class = LimitOffsetPagination
