
from django.urls import path
from .views import create_account, get_accounts_by_product
from .views import CreateProductView, ProductListView, ParameterListView, CreateProductParameterView 

urlpatterns = [
    path('accounts/create/', create_account, name='create-account'),
    path('accounts/<int:product_id>/', get_accounts_by_product, name='get-accounts-by-product'),
    path('api/products/', CreateProductView.as_view(), name='create-product'),
    path('api/products/list/', ProductListView.as_view(), name='product-list'),
    path('api/parameters/', ParameterListView.as_view(), name='list-parameters'),
    path('api/productparameters/', CreateProductParameterView.as_view(), name='create-product-parameter'),  # New endpoint
]   





