from django.db import models


class HistoryWeatherModel(models.Model):
    name_city = models.CharField(null=True, blank=True, max_length=50)
    temp = models.FloatField(null=True, blank=True)
    last_date = models.DateTimeField(auto_now_add=True, auto_created=True)

    def __str__(self):
        return self.name_city
