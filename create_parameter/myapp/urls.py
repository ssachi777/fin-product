from django.urls import path
from .views import (
    create_parameter
)

from . import views


urlpatterns = [

path('api/parameters/create/', create_parameter, name='create-parameter'),
]