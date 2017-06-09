##Project overview
Speech application work with two api [Web Speech Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) and [Google Speech Api](https://cloud.google.com/speech/)

How it's works:
When you open application page, browser requested access for you microphone.

You need to choose an Api and then click by 'Start' button and just say something. After then you need click by 'Stop' button and you can see below result from Api and ability play or download your voice record.

You can start application by two way:
* localhost
* with [npm now](https://zeit.co/now) 

You can test application only on `localhost` or `https protocol`.

[Demo](https://server-whuddmoggm.now.sh/app/speech)

##Dependencies
- node v6.\*.\* required

##Setup
```
git clone https://github.com/PlusOneGeneration/speech.git
cd speech
npm install
```

##Start application
Production mode: `npm run build.front` and `npm start`

Development mode: `npm run start.dev` and `cd client && npm start`.  By default client app started on `http://localhost:4200` and connect with proxy to backend default `localhost:3000`. Angular cli proxy configuration: `client/proxy.conf.json`


##Technologies
- express js 
- angular 2
- RecordRTC
- Web Speech Api
- Google Speech Api
