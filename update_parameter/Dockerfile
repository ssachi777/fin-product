FROM python:3.11-slim

WORKDIR /update_parameters

COPY requirements.txt /update_parameters/
RUN pip3 install -r /update_parameters/requirements.txt

COPY . .


CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]