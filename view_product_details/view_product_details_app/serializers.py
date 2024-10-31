from rest_framework import serializers

from .models import Product,Parameter
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'product_name', 'description','parent_product_id', 'is_custom']  # Include product_id for fetching
        


class ParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parameter
        fields = '__all__'  # or specify the fields you want to include
 