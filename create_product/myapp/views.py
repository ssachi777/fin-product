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


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
@api_view(['GET'])
def get_latest_product_id(request):
    try:
        last_product = Product.objects.order_by('-product_id').first()
        if last_product:
            new_id = last_product.product_id + 1
        else:
            new_id = 1001  # Starting ID
        return Response({'new_product_id': new_id}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
def create_product(request):
    # Generate a unique product_id
    if 'product_id' not in request.data:
        last_product = Product.objects.order_by('-product_id').first()
        if last_product:
            product_id = last_product.product_id + 1
        else:
            product_id = 1001  # Starting ID if no products exist
        request.data['product_id'] = product_id

    try:
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)