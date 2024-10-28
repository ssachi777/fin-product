from django.urls import path
from .views import (
    ParameterListView
)

from . import views


urlpatterns = [

path('api/parameters/', ParameterListView.as_view(), name='list-parameters')
]