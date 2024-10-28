from django.urls import path
from .views import (get_accounts_by_product)

urlpatterns = [
    path('accounts/<int:product_id>/', get_accounts_by_product, name='get-accounts-by-product'),
    ]