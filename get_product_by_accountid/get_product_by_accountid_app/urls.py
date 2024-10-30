from django.urls import path
from .views import (get_product_by_account)

urlpatterns = [
     path('product/account/<int:account_id>/', get_product_by_account, name='get_product_by_account'),
    ]