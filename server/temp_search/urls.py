from django.contrib import admin
from django.urls import path, include

app_name = "project"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('api/', include('core.api.urls'))
]
