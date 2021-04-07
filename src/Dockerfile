FROM python:3.8-slim-buster

WORKDIR /app

COPY ./src/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY ./src .

CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]