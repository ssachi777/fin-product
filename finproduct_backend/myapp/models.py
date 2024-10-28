# models.py
from django.db import models

class Product(models.Model):
    product_id = models.BigIntegerField(primary_key=True)  # Change to BigIntegerField for INT8
    admin_id = models.BigIntegerField(null=True, blank=True)  # INT8
    product_name = models.CharField(max_length=255)  # VARCHAR(255)
    parent_product_id = models.BigIntegerField(null=True, blank=True)  # INT8
    is_custom = models.BooleanField(default=False)  # BOOL
    description = models.TextField(null=True, blank=True)  # STRING
    created_at = models.DateTimeField(auto_now_add=True)  # TIMESTAMPTZ with default now()

    class Meta:
        db_table = 'products'  # Ensure it uses the existing table in the database

    def __str__(self):
        return self.product_name

    @staticmethod
    def generate_product_id():
        last_product = Product.objects.order_by('product_id').last()
        if last_product:
            return last_product.product_id + 1  # Incrementing the last product ID
        return 1  # Starting from 1



class Accounts(models.Model):
    account_id = models.IntegerField(primary_key=True)
    product = models.ForeignKey(Product, null=True, blank=True, on_delete=models.CASCADE)  # Foreign key to Product
    admin_id = models.BigIntegerField(default=1001)
    account_name = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'account'

    def save(self, *args, **kwargs):
        if not self.account_id:  # Only set if account_id is not provided
            max_id = Accounts.objects.aggregate(models.Max('account_id'))['account_id__max']
            self.account_id = (max_id + 1) if max_id is not None else 1
        
        if not self.admin_id:  # Only set if admin_id is not provided
            max_admin_id = Accounts.objects.aggregate(models.Max('admin_id'))['admin_id__max']
            self.admin_id = (max_admin_id + 1) if max_admin_id is not None else 1001  # Start from 1001

        super().save(*args, **kwargs)


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
class ProductParameter(models.Model):
    product_id = models.BigIntegerField()  # Foreign key to Product
    parameter_id = models.CharField(max_length=255)  # Foreign key to Parameter as CharField
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'productparameter'
        unique_together = (('product_id', 'parameter_id'),)  # Composite primary key
        managed = False  # This might prevent saving
