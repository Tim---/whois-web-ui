FROM alpine:latest
WORKDIR /whois-web-ui
COPY . .
RUN apk update
RUN apk add npm python3 py3-flask py3-requests
RUN cd whois-ng3 && ( npm install --silent && ./node_modules/.bin/ng build )
CMD flask run --host 0.0.0.0 --port 5000
EXPOSE 5000/tcp
