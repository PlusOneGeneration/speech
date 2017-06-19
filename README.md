## Project overview
Speech application work with two api [Web Speech Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) and [Google Speech Api](https://cloud.google.com/speech/)

How it's works:
When you open application page, browser requested access for you microphone.

You need to choose an Api and then click by 'Start' button and just say something. After then you need click by 'Stop' button and you can see below result from Api and ability play or download your voice record.

You can start application by two way:
* localhost
* with [npm now](https://zeit.co/now) 

You can test application only on `localhost` or `https protocol`.

[Demo](https://plus-speech.now.sh/app/speech)

## Dependencies
- node v6+.\*.\*
- mongoDB
- angular-cli
- Docker
- Docker-compose

## Setup
```
git clone https://github.com/PlusOneGeneration/speech.git
cd speech
npm install
```
After installing dependencies you should configure application.
Open `config/default.js` and fill your host, port, mongoDB url and OAuth credential for Google and Facebook.
If you production configuration is different, you can fill credential in `config/prod.js`. When you start application with `NODE_ENV=prod` application take configuration from `config/prod.js`.

## Start application

#### Backend in Development mode:
 ##### Docker-compose
 For start backend run `docker-compose up` or `make app`
 
 ##### NPM
 For start backend run `npm run start.dev`. You system should be have installed mongoDB.

#### Client
 For start client `cd client && npm start`. Client app connected with backend through proxy. 
 By default client app started on `http://localhost:4200` and connect with backend by default `localhost:3000`.
 Angular cli proxy configuration: `client/proxy.conf.json`

#### Production mode
 Build client `npm run build.front` 
 
 Start application `npm start`, application started with `NODE_ENV=prod` or deploy trough Docker container

## Technologies
- express js 
- angular 2
- RecordRTC
- Web Speech Api
- Google Speech Api
