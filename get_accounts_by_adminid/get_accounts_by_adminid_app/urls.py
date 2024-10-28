from django.urls import path
from .views import (get_accounts_by_adminid)
urlpatterns = [
    path('accounts/adminid/<int:admin_id>/', get_accounts_by_adminid, name='get-accounts-by-product'),
    ]