from requests import Session


class OpenWeatherAPISession(Session):

    def __init__(self, *args, **kwargs):
        super(OpenWeatherAPISession, self).__init__()

        self.headers.update({
            'Accept-Charset': 'utf-8',
            'Content-Type': 'application/json'
        })
