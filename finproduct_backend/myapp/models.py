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
