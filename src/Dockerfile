FROM python:3.8-slim-buster
FROM golang:1.16-alpine as build

RUN apk --no-cache add git
RUN go get -v github.com/OWASP/Amass/v3/...

FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=build /go/bin/amass /bin/amass
ENV HOME /
ENTRYPOINT ["/bin/amass"]

WORKDIR /app

COPY ./src/requirements.txt requirements.txt
COPY ./src/ENTER_AMASS_FILE AMASS_FILE
RUN pip3 install -r requirements.txt

COPY ./src .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
