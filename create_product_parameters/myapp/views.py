from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework import generics
from .models import ProductParameter
from .serializers import  ProductParameterSerializer

class CreateProductParameterView(generics.CreateAPIView):
    queryset = ProductParameter.objects.all()
    serializer_class = ProductParameterSerializer


@api_view(['POST'])
def create_product_parameter(request):
    try:
        serializer = ProductParameterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
