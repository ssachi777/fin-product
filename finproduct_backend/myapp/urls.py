# myapp/urls.py
from django.urls import path
from .views import CreateProductView

urlpatterns = [
    path('api/products/', CreateProductView.as_view(), name='create-product'),
]
