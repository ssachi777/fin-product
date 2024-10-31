from django.db import models

class Product(models.Model):
    product_id = models.BigIntegerField(primary_key=True)
    admin_id = models.BigIntegerField(null=True, blank=True)
    product_name = models.CharField(max_length=255)
    parent_product_id = models.BigIntegerField(null=True, blank=True)
    is_custom = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'products'
        managed = False  # Prevent Django from creating or altering this table

    def __str__(self):
        return self.product_name

    @staticmethod
    def generate_product_id():
        last_product = Product.objects.order_by('product_id').last()
        if last_product:
            return last_product.product_id + 1
        return 1


from django.db import models


class Parameter(models.Model):
    parameter_id = models.CharField(primary_key=True)  # Change to BigIntegerField
    parameter_name = models.CharField(max_length=255)
    data_type = models.CharField(max_length=50, null=True)
    default_value = models.CharField(max_length=255, null=True)
    min_value = models.CharField(max_length=255, null=True)
    max_value = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'parameters'

    def __str__(self):
        return self.parameter_name

    @staticmethod
    def generate_parameter_id():
        last_parameter = Parameter.objects.order_by('parameter_id').last()
        if last_parameter:
            return last_parameter.parameter_id + 1  # Incrementing the last parameter ID
        return 1010793861928484865
    
    
from django.db import models

class ProductParameter(models.Model):
    product_id = models.BigIntegerField()  
    parameter_id = models.CharField(max_length=255)  
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'productparameter'
        unique_together = (('product_id', 'parameter_id'),) 
        managed = False  
    