from django.urls import path
from .views import create_account, get_accounts_by_product

urlpatterns = [
    path('accounts/create/', create_account, name='create-account'),
    path('accounts/<int:product_id>/', get_accounts_by_product, name='get-accounts-by-product'),
]
