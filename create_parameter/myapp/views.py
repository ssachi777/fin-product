from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework import generics
from .models import Parameter
from .serializers import ParameterSerializer

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