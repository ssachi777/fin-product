from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from django.http import JsonResponse
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from .models import Product
from .serializers import ProductSerializer
# Create your views here.
@api_view(['PUT'])
def update_product(request, product_id):
    try:
        product = Product.objects.get(product_id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProductSerializer(product, data=request.data, partial=True)  # Use partial=True to allow partial updates
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)