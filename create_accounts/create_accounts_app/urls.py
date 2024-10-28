from django.urls import path
from .views import (create_account)

urlpatterns = [
    path('accounts/create/', create_account, name='create-account'),
    ]