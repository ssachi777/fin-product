from django.shortcuts import render
from .models import Accounts
from .serializers import AccountsSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
# Create your views here.
@api_view(['POST'])
def create_account(request):
    serializer = AccountsSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()  # This will automatically handle the ForeignKey
            return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
