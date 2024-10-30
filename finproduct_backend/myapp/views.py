from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import logging

from django.shortcuts import get_object_or_404 
from .serializers import AccountSerializer
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from .models import Accounts, Product, Parameter, ProductParameter
from .serializers import AccountSerializer,ProductSerializer, ParameterSerializer, ProductParameterSerializer
logger = logging.getLogger(__name__)
@api_view(['POST'])
def create_parameter(request):
    # Generate a unique parameter_id
    parameter_id = Parameter.generate_parameter_id()  # Call the static method to get the new ID
    request.data['parameter_id'] = parameter_id  # Add the parameter_id to the request data

    serializer = ParameterSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['PUT'])
def update_parameter(request, parameter_id):
    print("Received parameter_id:", parameter_id)  # Log the parameter ID
    try:
        parameter = Parameter.objects.get(parameter_id=parameter_id)
    except Parameter.DoesNotExist:
        return Response({'error': f'Parameter with ID {parameter_id} not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ParameterSerializer(parameter, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def create_account(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()  # This will automatically handle the ForeignKey
            return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_accounts_by_product(request, product_id):
    # Fetch accounts associated with the given product_id
    accounts = Accounts.objects.filter(product_id=product_id)
    
    if not accounts.exists():
        return Response({"error": "No accounts found for this product."}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the account objects
    serializer = AccountSerializer(accounts, many=True)
    
    # Return the list of accounts as a JSON response
    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['GET'])
def get_accounts_by_adminid(request, admin_id):
    # Fetch accounts associated with the given product_id
    accounts = Accounts.objects.filter(admin_id=admin_id)
    
    if not accounts.exists():
        return Response({"error": "No accounts found for this product."}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the account objects
    serializer = AccountSerializer(accounts, many=True)
    
    # Return the list of accounts as a JSON response
    return Response(serializer.data, status=status.HTTP_200_OK)

# myapp/views.py
@api_view(['GET'])
def get_product_by_account(request, account_id):
    """
    Fetch the product associated with the given account ID.
    """
    try:
        account = Accounts.objects.get(account_id=account_id)
        product = Product.objects.get(product_id=account.product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Accounts.DoesNotExist:
        return Response({'detail': 'Account not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found for this account.'}, status=status.HTTP_404_NOT_FOUND)


# New view for fetching products
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CreateProductParameterView(generics.CreateAPIView):
    queryset = ProductParameter.objects.all()
    serializer_class = ProductParameterSerializer

class ParameterListView(generics.ListAPIView):
    queryset = Parameter.objects.all()
    serializer_class = ParameterSerializer
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
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

def get_product_by_id(request, product_id):
    # Fetch the product or return a 404 if not found
    product = get_object_or_404(Product, product_id=product_id)

    # Serialize the product data
    product_data = {
        'product_id': product.product_id,
        'admin_id': product.admin_id,
        'product_name': product.product_name,
        'parent_product_id': product.parent_product_id,
        'is_custom': product.is_custom,
        'description': product.description,
        'created_at': product.created_at.isoformat(),
    }

    return JsonResponse(product_data)

@api_view(['GET'])
def get_product_parameters(request, product_id):
    """
    Fetch all parameters associated with a given product ID.
    """
    product_parameters = ProductParameter.objects.filter(product_id=product_id)
    if not product_parameters.exists():
        return Response({"error": "No parameters found for this product."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductParameterSerializer(product_parameters, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def update_product_parameters(request, product_id):
    logger.info(f"Received request data: {request.data}")

    # Extract 'selected_parameters'
    selected_parameters = request.data.get('selected_parameters')
    if not selected_parameters or not isinstance(selected_parameters, list):
        return Response(
            {"error": "Expected 'selected_parameters' to be a list of parameter IDs."},
            status=status.HTTP_400_BAD_REQUEST
        )

    existing_parameters = ProductParameter.objects.filter(product_id=product_id)
    response_data = []
    for parameter_id in selected_parameters:
        product_parameter, created = ProductParameter.objects.get_or_create(
            product_id=product_id,
            parameter_id=parameter_id
        )
        response_data.append({
            "product_id": product_id,
            "parameter_id": parameter_id,
            "created": created
        })

    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_parameters_by_id(request, parameter_id):
    """
    Fetch all parameters associated with a given product ID.
    """
    parameters = Parameter.objects.filter(parameter_id=parameter_id)
    if not parameters.exists():
        return Response({"error": "No parameters found for this product."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ParameterSerializer(parameters, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)