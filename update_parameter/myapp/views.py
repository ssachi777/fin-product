from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework import generics
from .models import Parameter
from .serializers import ParameterSerializer


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