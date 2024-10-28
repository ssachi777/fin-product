
from django.urls import path
from .views import (
    CreateProductParameterView
)

from . import views

urlpatterns = [
    path('api/productparameters/', CreateProductParameterView.as_view(), name='create-product-parameter'),  # New endpoint
]   