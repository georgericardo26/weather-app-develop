from django.conf import settings
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

app_name = settings.API_VERSION

schema_view = get_schema_view(
   openapi.Info(
      title="Weather API",
      default_version='v1',
      description="A Web API that return the current weather from input data",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="george@cookbooknerd.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('user/', include('core.api.urls_v1.user_urls')),
    path('auth/', include('core.api.urls_v1.auth_urls')),
    path('weather/', include('core.api.urls_v1.weather_urls')),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0),
            name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0),
            name='schema-redoc'),
]
