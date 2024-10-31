FROM python:3.11-slim

WORKDIR /create_accounts

COPY requirements.txt /create_accounts/
RUN pip3 install -r /create_accounts/requirements.txt

COPY . .


CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]