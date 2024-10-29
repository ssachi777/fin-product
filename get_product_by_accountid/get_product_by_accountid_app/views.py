from django.shortcuts import render
from .serializers import AccountsSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import logging
from .models import Accounts
import requests
# @api_view(['GET'])
# def get_product_by_account(request, account_id):
#     """
#     Fetch the product associated with the given account ID.
#     """
#     try:
#         account = Accounts.objects.get(account_id=account_id)
#         product = Product.objects.get(product_id=account.product_id)
#         serializer = ProductSerializer(product)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except Accounts.DoesNotExist:
#         return Response({'detail': 'Account not found.'}, status=status.HTTP_404_NOT_FOUND)
#     except Product.DoesNotExist:
#         return Response({'detail': 'Product not found for this account.'}, status=status.HTTP_404_NOT_FOUND)
    
    # create_accounts/views.py


def get_product_by_account(request, account_id):
    try:
        account = Accounts.objects.get(pk=account_id)
        product_id = account.product_id

        if product_id is None:
            return JsonResponse({"error": "Product ID not associated with this account"}, status=404)

        # Replace `create_product_service_url` with the actual URL of the create_product service
        response = requests.get(f"http://localhost:8000/api/products/{product_id}/") 
        if response.status_code == 200:
            product_data = response.json()
            return JsonResponse({
                "account_id": account.account_id,
                "account_name": account.account_name,
                "status": account.status,
                "created_at": account.created_at,
                "product": product_data,
            })
        else:
            return JsonResponse({"error": "Product not found in create_product service"}, status=404)
    except Accounts.DoesNotExist:
        return JsonResponse({"error": "Account not found"}, status=404)

