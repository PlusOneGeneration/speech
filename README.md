## Project overview
Speech application work with two api [Web Speech Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) and [Google Speech Api](https://cloud.google.com/speech/)

How it's works:
When you open application page, browser requested access for you microphone.

You need to choose an Api and then click by 'Start' button and just say something. After then you need click by 'Stop' button and you can see below result from Api and ability play or download your voice record.

You can test application only on `localhost` or `https protocol`.

[Demo](https://plus-speech.now.sh/app/speech)

## Dependencies
- node v6+.\*.\*
- mongoDB
- angular-cli
- Docker (for development, not required)
- Docker-compose (for development, not required)

## Setup
#### Step 1. Clone and install
```
git clone https://github.com/PlusOneGeneration/speech.git (why it removed)
cd speech
npm install
```

#### Step 2. Configure application
After installing dependencies you should configure application.

At first open `config/default.js` and fill:
 - host - application host (required)  
 - mongoDB url - url to you mongoDB (required).
 
```
module.exports = {
    host: 'http://localhost'
    port: 3000
    mongo: {
        url: 'mongodb://mongo/dev',
    },
    ...
}
```

#### Step 3. Create Google Speech Application
1. Open [Create project](https://console.cloud.google.com/projectcreate?organizationId=0) link
2. Fill project name and click "Create"
3. Open left menu and select Api Manager -> Credentials
4. Click "Create credentials" and select "Service account key"
5. Select "Service account" or select "New service account"
6. Fill "Service account name" and select role "Project" -> "Owner".
7. Select "Key type" -> "JSON"
8. Click "Create" then file with credentials will download on your pc.
9. Open that file in text editor and copy all field to `config/default.js googleSpeech->credentials` 

#### Step 4. Create Google OAuth credentials

1. Open [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Open left menu and select Api Manager -> Credentials
4. Click "Create credentials" and select "OAuth client ID"
5. If you receive message "To create an OAuth client ID, you must first set a product name on the consent screen" click "Configure consent screen"
6. Fill "Product name shown to users" it field is required and click "Save"
7. Then select web application
8. Fill name, in "Authorized JavaScript origins" type your site host and in "Authorized redirect URIs
" type google callback, host + callback uri, like that `https://plus-speech.now.sh/api/auth/google/callback`
9. Click "Create"
10. You will receive credential for OAuth.
11. Open file `config/default.js` oAuth -> google and fill `clientId` `secret` from step 10. You need to check `callback` without host,  with callback from step 8.

#### Step 5. Create Facebook OAuth credentials
1. Open [https://developers.facebook.com/](https://developers.facebook.com/)
2. My Apps -> Add a New App
3. Fill application name and contact email and click Create App Id
4. You should see "Product setup" and select "Facebook Login" and click "Get started"
5. Click in left menu "Facebook Login"
6. Check options:
 - Client OAuth Login - yes
 - Web OAuth Login - yes
 - Embedded Browser OAuth Login - no
 - Force Web OAuth Reauthentication - no
7. Fill "Valid OAuth redirect URIs", looks like {you host}/api/auth/facebook/callback press enter and click "Save changes". You can use several callback on one application.
8. Click in left menu "Settings"
9. Fill "Site Url" like `https://plus-speech.now.sh` click "Save changes". You can use several sites, every site separate by space. Example `https://plus-speech.now.sh/ http://localhost:3000`
10. Open file `config/default.js` oAuth -> facebook and fill `clientId` equal `App ID`, `secret` equal `App Secret`, `App ID, App Secret` from "Settings" page. You need to check `callback` without host,  with callback from step 7. 

#### Step 6. You application configured. Go section "Start application"

You can have different configuration for production and development mode. 
For this you need in file `config/prod.js` paste field with another configuration, you can paste only another field.
 
***(!)*** File structure `config/prod.js` should be like `config/default.js`
When you start application with `NODE_ENV=prod` application take configuration from `config/prod.js`.

## Start application

#### Backend in Development mode:
 ##### Docker-compose
 *not necessary, just for dev mode*
 
 Use `Make` file for shortcuts. All commands `make help`
 
 For start backend run `docker-compose up` or `make app`.

 If you need stop docker-compose containers use `make stop`
 
 ##### Local install
 For start backend run `npm run start.dev`. 
 
 ***(!)*** You system should have installed `mongoDB`.

#### Client
 Client started always from local. For first start client:
 ```
 cd client 
 npm install
 npm start
 ```  
 
For the following starts use only:
```
cd client 
npm start
```  
 Client app connected with backend through proxy. 
 By default client app started on `http://localhost:4200` and connect with backend by default `localhost:3000`.
 Angular cli proxy configuration: `client/proxy.conf.json`

#### Production mode
 Before starting you need to generate/compress/collect all js files for front-end.
  
 Build client `npm run production.prepare.front`, for building angular 2 used `@angular/cli`.
 Or you can use:
```
	cd client 
	ng build --prod --env=prod
```
 
 Generated and compressed files store in folder `client/dist`.
 
 Start application `npm start`, application started with `NODE_ENV=prod` and get credentials from `config/prod.js` file

## Technologies
- express js 
- angular 2
- RecordRTC
- Web Speech Api
- Google Speech Api
