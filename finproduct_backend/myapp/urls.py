
from django.urls import path
from .views import (
    create_account,
    get_accounts_by_product,
    get_product_by_account,
    get_accounts_by_adminid,
    ProductListView,
    ParameterListView,
    CreateProductParameterView,
    create_parameter,
    update_parameter,
    get_latest_product_id,
    create_product
)

from . import views


urlpatterns = [
    path('api/products/latest-id/', get_latest_product_id, name='latest-product-id'),
    path('api/products/create/', create_product, name='create-product'),
    path('accounts/create/', create_account, name='create-account'),
    path('accounts/<int:product_id>/', get_accounts_by_product, name='get-accounts-by-product'),
    path('accounts/adminid/<int:admin_id>/', get_accounts_by_adminid, name='get-accounts-by-product'),
    path('product/account/<int:account_id>/', get_product_by_account, name='get_product_by_account'),
   
    path('api/products/list/', ProductListView.as_view(), name='product-list'),
    path('api/parameters/', ParameterListView.as_view(), name='list-parameters'),
    path('api/parameters/<int:parameter_id>/', update_parameter, name='update-parameter'),
    path('api/parameters/create/', create_parameter, name='create-parameter'),
    path('api/productparameters/', CreateProductParameterView.as_view(), name='create-product-parameter'),  # New endpoint
]   





