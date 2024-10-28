from django.shortcuts import render
from django.shortcuts import render
from .serializers import AccountsSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import logging
from .models import Accounts

# Create your views here.
@api_view(['GET'])
def get_accounts_by_adminid(request, admin_id):
    # Fetch accounts associated with the given product_id
    accounts = Accounts.objects.filter(admin_id=admin_id)
    
    if not accounts.exists():
        return Response({"error": "No accounts found for this product."}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the account objects
    serializer = AccountsSerializer(accounts, many=True)
    
    # Return the list of accounts as a JSON response
    return Response(serializer.data, status=status.HTTP_200_OK)
