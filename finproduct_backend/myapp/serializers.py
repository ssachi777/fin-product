
from rest_framework import serializers
from .models import Account,Product

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['product_id', 'admin_id', 'account_name', 'status']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'product_name', 'description','parent_product_id', 'is_custom']  # Include product_id for fetching
        read_only_fields = ['product_id']  # Make product_id read-only

