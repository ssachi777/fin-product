
from rest_framework import serializers

from .models import ProductParameter

class ProductParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductParameter
        fields = ['product_id', 'parameter_id', 'created_at']