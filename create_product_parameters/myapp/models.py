from django.db import models

class ProductParameter(models.Model):
    product_id = models.BigIntegerField()  
    parameter_id = models.CharField(max_length=255)  
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'productparameter'
        unique_together = (('product_id', 'parameter_id'),) 
        managed = False  
