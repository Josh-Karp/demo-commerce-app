FROM python:3.8-slim-buster

RUN pip3 install --upgrade pip setuptools \
    pip install PyMySQL cryptography python-dotenv

RUN mkdir /flask
WORKDIR /flask

COPY requirements.txt flask/requirements.txt
RUN pip3 install -r flask/requirements.txt

COPY . .

ENTRYPOINT ["python"]
CMD ["src/app.py"]