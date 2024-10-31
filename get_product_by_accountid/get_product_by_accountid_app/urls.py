from django.urls import path
from .views import (get_product_details_by_account_id)

urlpatterns = [
    path('account/<int:account_id>/product-details/', get_product_details_by_account_id, name='product_details_by_account_id'),
    ]