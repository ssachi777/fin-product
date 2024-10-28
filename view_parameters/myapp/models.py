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