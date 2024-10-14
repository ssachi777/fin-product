
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Accounts
from .serializers import AccountSerializer
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer


@api_view(['POST'])
def create_account(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()  # Save the new account entry
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

class CreateProductView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        # Automatically generate product_id and use None for admin_id
        product_id = Product.generate_product_id()  # Generate new product_id
        serializer.save(product_id=product_id, admin_id=None)  # Pass product_id and admin_id

# New view for fetching products
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

