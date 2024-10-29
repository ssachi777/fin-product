from rest_framework import serializers
from .models import Accounts

class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['account_id', 'product_id', 'admin_id', 'account_name', 'status', 'created_at']
        read_only_fields = ['account_id', 'created_at']  # account_id and created_at should not be updated by the client