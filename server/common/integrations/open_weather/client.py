import urllib
from urllib.parse import urljoin
from django.conf import settings
from rest_framework import status

from common.integrations.open_weather.exception import handle_error_response
from common.integrations.open_weather.session import OpenWeatherAPISession


class OpenWeatherAPIBaseClient(object):

    def __init__(self):
        """
        Instantiate a new API client.
        """
        self.host = settings.OPEN_WEATHER_API_URL_BASE
        self.version = settings.OPEN_WEATHER_API_VERSION
        self.default_params = {"appid": settings.OPEN_WEATHER_API_APP_ID}
        self.appid = settings.OPEN_WEATHER_API_APP_ID

        # Initialize the session.
        self.session = OpenWeatherAPISession()

    # Convenience method for building request URLs.
    @property
    def url(self):
        return urljoin(self.host, self.version)

    def add_default_params(self, params):
        return "&".join([params,
                         urllib.parse.urlencode(self.default_params,
                                                quote_via=urllib.parse.quote)])

    # Perform an API request.
    def _request(self, method, endpoint, params=None, data=None):

        url = urljoin(self.url, endpoint)

        if params:
            params = urllib.parse.urlencode(params,
                                            quote_via=urllib.parse.quote)
            params = self.add_default_params(params)

        resp = self.session.request(method,
                                    url,
                                    params=params,
                                    data=data,
                                    headers=self.session.headers)

        # If something goes wrong, we'll pass the response
        # off to the error-handling code
        if resp.status_code >= status.HTTP_400_BAD_REQUEST:
            handle_error_response(resp)

        # Otherwise return the result dictionary.
        return resp.json()


class OpenWeatherAPIClient(OpenWeatherAPIBaseClient):

    def search_weather(self, query):
        return self._request('GET', 'weather', params=query)
