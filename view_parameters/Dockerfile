FROM python:3.11-slim

WORKDIR /view_parameters

COPY requirements.txt /view_parameters/
RUN pip3 install -r /view_parameters/requirements.txt

COPY . .


CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]