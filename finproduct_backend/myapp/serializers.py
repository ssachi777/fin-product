# myapp/serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_name', 'description']  # Exclude product_id from the fields
        read_only_fields = ['product_id']  # Make product_id read-only
