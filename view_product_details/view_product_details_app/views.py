from django.shortcuts import render
from .models import Product,Parameter,ProductParameter
from .serializers import ProductSerializer,ParameterSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# Create your views here
@api_view(['GET'])
def get_parent_products(request):
    # Fetch products where parent_product_id is NULL
    products = Product.objects.filter(parent_product_id__isnull=True)
    
    # Serialize the products queryset
    serializer = ProductSerializer(products, many=True)
    
    return Response({'products': serializer.data})


@api_view(['GET'])
def product_details_with_parameters(request, product_id):
    try:
        # Fetch the specific product
        product = Product.objects.get(product_id=product_id)
        product_serializer = ProductSerializer(product)

        # Fetch associated parameters by joining with ProductParameter
        parameter_ids = ProductParameter.objects.filter(product_id=product_id).values_list('parameter_id', flat=True)
        parameters = Parameter.objects.filter(parameter_id__in=parameter_ids)
        parameter_serializer = ParameterSerializer(parameters, many=True)

        # Combine product details and parameters
        return Response({
            'product': product_serializer.data,
            'parameters': parameter_serializer.data
        })
        
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)