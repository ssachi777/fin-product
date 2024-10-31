from django.urls import path
from .views import ( get_parent_products,product_details_with_parameters)
from . import views
urlpatterns = [
    path('products/parent-product/', get_parent_products, name='get_parent_products'),
    path('products/parameters/<int:product_id>/', product_details_with_parameters, name='product-details-with-parameters'),
    
]