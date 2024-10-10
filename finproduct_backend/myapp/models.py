# myapp/models.py
from django.db import models

class Account(models.Model):
    account_id = models.IntegerField(primary_key=True)  # Change to IntegerField
    product_id = models.IntegerField(null=True, blank=True)
    admin_id = models.BigIntegerField(null=True, blank=True)
    account_name = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'account'

    def save(self, *args, **kwargs):
        if not self.account_id:  # Only set if account_id is not provided
            max_id = Account.objects.aggregate(models.Max('account_id'))['account_id__max']
            self.account_id = (max_id + 1) if max_id is not None else 1
        super().save(*args, **kwargs)
        
class Product(models.Model):
    product_id = models.BigIntegerField(primary_key=True, unique=True)  # INT8 as BigIntegerField
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

