from django.db import models
# Create your models here.
class Accounts(models.Model):
    account_id = models.IntegerField(primary_key=True)
    product_id = models.BigIntegerField( null=True, blank=True,)
    admin_id = models.BigIntegerField(default=1001)
    account_name = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'accounts'

    def save(self, *args, **kwargs):
        if not self.account_id:  # Only set if account_id is not provided
            max_id = Accounts.objects.aggregate(models.Max('account_id'))['account_id__max']
            self.account_id = (max_id + 1) if max_id is not None else 1
        
        if not self.admin_id:  # Only set if admin_id is not provided
            max_admin_id = Accounts.objects.aggregate(models.Max('admin_id'))['admin_id__max']
            self.admin_id = (max_admin_id + 1) if max_admin_id is not None else 1001  # Start from 1001

        super().save(*args, **kwargs)
        
        
        


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
        
