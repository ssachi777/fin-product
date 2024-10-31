FROM python:3.11-slim

WORKDIR /create_product

COPY requirements.txt /create_product/
RUN pip3 install -r /create_product/requirements.txt

COPY . .


CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]