# myapp/views.py
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

class CreateProductView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        # Automatically generate product_id and use None for admin_id
        product_id = Product.generate_product_id()  # Generate new product_id
        serializer.save(product_id=product_id, admin_id=None)  # Pass product_id and admin_id

# New view for fetching products
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
