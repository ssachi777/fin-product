from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework import generics

from .models import  Parameter
from .serializers import  ParameterSerializer
class ParameterListView(generics.ListAPIView):
    queryset = Parameter.objects.all()
    serializer_class = ParameterSerializer
