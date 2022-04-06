from django.urls import path

from core.api.open_api_schema import DecoratedWeatherView
from core.api.views import weather_views

urlpatterns = [
    path('search/', DecoratedWeatherView, name='weather_search'),
    path('history/', weather_views.HistoryWeatherView.as_view(),
         name='weather_history'),
]
