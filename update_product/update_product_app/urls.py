from django.urls import path

from . import views
urlpatterns = [
     path('products/update/<int:product_id>/', views.update_product, name='update_product'),
]