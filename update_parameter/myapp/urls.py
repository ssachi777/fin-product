from django.urls import path
from .views import (
    update_parameter
)

from . import views


urlpatterns = [

    path('api/parameters/<int:parameter_id>/', update_parameter, name='update-parameter'),
]