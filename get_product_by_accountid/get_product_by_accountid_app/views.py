from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Accounts, Product
from .serializers import AccountsSerializer, ProductSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def get_product_details_by_account_id(request, account_id):
    # Fetch account details by account_id
    account = get_object_or_404(Accounts, account_id=account_id)

    # Fetch product details using product_id from the account
    product = get_object_or_404(Product, product_id=account.product_id)

    # Serialize the product details
    product_serializer = ProductSerializer(product)

    # Return only the serialized product details
    return Response(product_serializer.data)
