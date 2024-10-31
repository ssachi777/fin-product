FROM python:3.11-slim

WORKDIR /create_parameter

COPY requirements.txt /create_parameter/
RUN pip3 install -r /create_parameter/requirements.txt

COPY . .


CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]