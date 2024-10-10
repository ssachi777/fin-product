# myapp/models.py
from django.db import models

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
