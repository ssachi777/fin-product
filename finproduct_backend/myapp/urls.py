
from django.urls import path
from .views import create_account, get_accounts_by_product,get_product_by_account
from .views import CreateProductView, ProductListView

urlpatterns = [
    path('accounts/create/', create_account, name='create-account'),
    path('accounts/<int:product_id>/', get_accounts_by_product, name='get-accounts-by-product'),
    path('product/account/<int:account_id>/', get_product_by_account, name='get_product_by_account'),
    path('api/products/', CreateProductView.as_view(), name='create-product'),
    path('api/products/list/', ProductListView.as_view(), name='product-list'),
]





