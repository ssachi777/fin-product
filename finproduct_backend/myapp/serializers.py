
from rest_framework import serializers

from .models import Accounts,Product, Parameter, ProductParameter


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'product_name', 'description','parent_product_id', 'is_custom']  # Include product_id for fetching
        read_only_fields = ['product_id']  # Make product_id read-only

class ParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parameter
        fields = '__all__'  # or specify the fields you want to include

class ProductParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductParameter
        fields = ['product_id', 'parameter_id', 'created_at']