
from rest_framework import serializers

from .models import  Parameter

  

class ParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parameter
        fields = '__all__'  # or specify the fields you want to include
