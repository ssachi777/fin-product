from django.urls import path
from .views import ( create_product,get_latest_product_id)
from . import views
urlpatterns = [
    path('api/products/latest-id/', get_latest_product_id, name='latest-product-id'),
    path('api/products/create/', create_product, name='create-product'),
]