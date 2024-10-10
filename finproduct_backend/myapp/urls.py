# myapp/urls.py
from django.urls import path
from .views import CreateProductView, ProductListView

urlpatterns = [
    path('api/products/', CreateProductView.as_view(), name='create-product'),
    path('api/products/list/', ProductListView.as_view(), name='product-list'),  # New endpoint
]
