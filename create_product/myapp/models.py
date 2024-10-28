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
