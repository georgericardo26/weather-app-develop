from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status

from core.api.serializers.auth_serializers import AuthOutputSerializer
from core.api.serializers.weather_serializers import WeatherOutputSerializer
from core.api.views.auth_views import AuthView
from core.api.views.weather_views import WeatherView


zip_param = openapi.Parameter(
    'zip', openapi.IN_QUERY,
    description="Search a temperature by ZipCode",
    type=openapi.TYPE_STRING, required=True)

q_param = openapi.Parameter(
    'q', openapi.IN_QUERY,
    description="Search a temperature by City Name and Country Code",
    type=openapi.TYPE_STRING, required=False)


DecoratedWeatherView = swagger_auto_schema(
      operation_description="Search temperature from zipCode or City",
      method='get',
      manual_parameters=[zip_param, q_param],
      responses={
          status.HTTP_200_OK: WeatherOutputSerializer,
          status.HTTP_400_BAD_REQUEST: ('One or more query '
                                        'parameter could not be validated.'),
          status.HTTP_404_NOT_FOUND: 'City not found'
      }
   )(WeatherView.as_view())


# Auth

DecoratedAuthView = swagger_auto_schema(
      operation_description="Authentication method",
      method='post',
      responses={
          status.HTTP_201_CREATED: AuthOutputSerializer,
          status.HTTP_400_BAD_REQUEST: "Bad request",
          status.HTTP_404_NOT_FOUND: 'not found'
      }
   )(AuthView.as_view())


