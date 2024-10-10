# myapp/serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'product_name', 'description','parent_product_id', 'is_custom']  # Include product_id for fetching
        read_only_fields = ['product_id']  # Make product_id read-only
