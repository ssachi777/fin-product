from rest_framework import serializers
from .models import Accounts,Product

class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['account_id', 'product_id', 'admin_id', 'account_name', 'status', 'created_at']
        read_only_fields = ['account_id', 'created_at']  # account_id and created_at should not be updated by the client
        
        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'product_name', 'description','parent_product_id', 'is_custom']  # Include product_id for fetching