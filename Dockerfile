FROM node:7
LABEL name "speech-app"

ADD . /app
WORKDIR /app
RUN npm install

EXPOSE 3000
ENTRYPOINT npm start