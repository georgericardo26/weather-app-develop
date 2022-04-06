# Loadsmart Weather App

This is a project created to seacrh temperature from address, it uses some external services as:
 google places API and Open Weather API.

Tools
------------
- Python
- Django
- Django Rest Framework
- DRF_yasg
- Open API Documentation
- Oauth2 Authentication
- PostgreSQL
- Docker
- Docker-compose
- gitlab-ci (Pipeline)
- RDS (AWS)
- EC2 (AWS)
- Javascript
- ReactJS

Dependencies
------------
- Python 3.6+
- Django 1.11+
- For the Server, Django REST Framework 3.7+ is required.
- For the Client, we use react 17.0.1.
- For run the server application, it's need have docker installed

Setup Server
------------
First you have to do a download of the docker image:

    `git clone https://gitlab.com/georgericardo26/weather-app.git`

Make sure you already has docker and docker-compose installed.

 `sudo apt  install docker.io`
 
  `sudo apt install docker-compose`


After, you will init the container service:

    `sudo docker-compose up`

Setup Client
------------
After cloned the repository:
    `cd client && cd weather_client`
    `npm i && npm start`
    
NOTE: The client will perform on port 3000 and the server will perform on port 8000 locally.

URL Base Server and Client
--------------------------
- Server: http://35.160.19.185(AWS) or http://0.0.0.0:8000(Local)
- Client: http://localhost:3000/(Local) - In deployment process

Server Resources
------------

Swagger and Redoc documentation
------------
![](https://apistaticfiles.s3-us-west-2.amazonaws.com/swagger.png)


Endpoints
------------
 - Search Weather: `api/weather/search/`
 - List history search: `api/weather/history/`
 - Create a user: `api/user/create/`
 - Authentication user: `api/auth/`

> #### Important
> - You need authenticate before use the services
> To authenticate, use this body data: 

 ```javascript
{
	"client_id": "TS7n0r9Biv3pGSYxIbVEo884BJMNhckg0hFIBxKS",
	"client_secret": "VBIxvy35woAjONroTIu8QexsVDox7lDyVRZnmcQ3MuraOHq0fBzLTcPlVjAhVE9VT5DPZtno7iKjeJfN3AhdPSIma08IcBy0nc2phdxUutsnRKLtcNPC7Qdkj64WpzlU",
	"grant_type": "password",
	"username": "your_username",
	"password": "your_password"
}
```

Once you've done that, you'll receive this response:
 ```javascript
{
  "access_token": "3M3oXxolTSJVuYrPjIrUYjqqLeH7Xt",
  "expires_in": 86400,
  "token_type": "Bearer",
  "scope": "read",
  "refresh_token": "joy4J0WediTorHE56To0rXE2jYwHwZ"
}
```
> #### Important
> - Except the endpoint api/user/create/, all endpoint need set the token in the header:
 ```javascript
{
  "Authorization": "Bearer 3M3oXxolTSJVuYrPjIrUYjqqLeH7Xt"
}
```

Client Resources
------------


Web Interface
------------
This is the web interface from Loadsmart Weather
![](https://apistaticfiles.s3-us-west-2.amazonaws.com/Captura+de+Tela+2021-01-28+a%CC%80s+11.38.31.png).
