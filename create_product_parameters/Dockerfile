FROM python:3.11-slim

WORKDIR /create_product_parameters

COPY requirements.txt /create_product_parameters/
RUN pip3 install -r /create_product_parameters/requirements.txt

COPY . .


CMD ["python", "manage.py", "runserver", "0.0.0.0:8003"]