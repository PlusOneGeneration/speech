## Project overview
Simple application allows to transform speech/voice to text. 
Based on two speech engines (can be selected in application): 
- [Web Speech Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Google Speech Api](https://cloud.google.com/speech/)

### Usage
1. You need to choose Speech Engine. 
2. Click 'Start' button. It will start record your voice. Just say something. 
3. To finish record session press 'Stop' button.
4. You will see result of voice-to-text translation.

### Note: 
- You need allow access to use your microphone.
- You can test application only on `localhost` or `https protocol`.

[Demo](https://plus-speech.now.sh/app/speech)

## Dependencies
- node v6.11.\*
- mongoDB
- angular-cli
- Docker (for development, not required)
- Docker-compose (for development, not required)

## Setup
#### Step 1. Clone and install
```
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
6. Fill "Service account name" and select role "Project" -> "Owner"
7. Select "Key type" -> "JSON"
8. Click "Create". It will start downloading file with credentials
9. Open this file in text editor and copy all field to `config/default.js googleSpeech->credentials` 

#### Step 4. Create Google OAuth credentials

1. Open [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Open left menu and select Api Manager -> Credentials
4. Click "Create credentials" and select "OAuth client ID"
5. If you receive message `To create an OAuth client ID, you must first set a product name on the consent screen` click "Configure consent screen"
6. Fill "Product name shown to users". This field is required. Then click "Save"
7. Then select web application
8. Fill name. Fill "Authorized JavaScript origins" type your site host. Fill "Authorized redirect URIs
" type google callback. Callback consist of `host` + `callback uri`, like that `https://plus-speech.now.sh/api/auth/google/callback`
9. Click "Create"
10. You will receive credential for OAuth.
11. Open file `config/default.js`. Fill `oAuth -> google` with `clientId` `secret` from step 10. 
12. You need to check `callback` field. It must be like callback from step 8 but without host. Example `api/auth/google/callback`

#### Step 5. Create Facebook OAuth credentials
1. Open [https://developers.facebook.com/](https://developers.facebook.com/)
2. My Apps -> Add a New App
3. Fill application name and contact email and click Create App Id
4. You should see "Product setup" and select "Facebook Login" and click "Get started"
5. Click "Facebook Login" in left menu 
6. Check options:
 - Client OAuth Login - yes
 - Web OAuth Login - yes
 - Embedded Browser OAuth Login - no
 - Force Web OAuth Reauthentication - no
7. Fill "Valid OAuth redirect URIs", like `host` + `/api/auth/facebook/callback` press enter and click "Save changes". Note: You can use several callback on one application.
8. Click "Settings" in left menu
9. Fill "Site Url" like `https://plus-speech.now.sh` click "Save changes". Note: You can use several sites. Each site separated by space. Example `https://plus-speech.now.sh/ http://localhost:3000`
10. Open file `config/default.js`. Fill `oAuth -> facebook` with `clientId: App ID` , `secret: App Secret`, `App ID, App Secret` from "Settings" page. 
11. You need to check `callback` field. It must be like callback from step 8 but without host. Example `api/auth/facebook/callback`
12. For production. Click "App review" in left menu. Turn off `Your app is in development and unavailable to the public`

#### Step 6. You application configured. Go section "Start application"

You can have different configuration for production and development mode. 
For this you need to set field with another configuration in file `config/prod.js`. You can paste only required fields.
 
***(!)*** File structure `config/prod.js` should be like `config/default.js`
When you start application with `NODE_ENV=prod` application take configuration from `config/prod.js`.

## Start application
#### Local for production
***Important:*** check you have nodejs v6.11.\* and mongoDB v3.4.\*.

##### Step 1. Build frontend for production
 Before starting you need to generate/compress/collect all js files for front-end.
   
 Run from project root folder. 
 Command to prepare client app for production: `npm run production.prepare.front`.
  
  Or you can use:
 ```
 cd client 
 ng build --prod --env=prod
 ``` 
 Note: For building angular 2 used `@angular/cli`. 
 Generated and compressed files are stored in folder `client/dist`.
  
##### Step 2. Start backend
 For start application run `npm start`.
 Application started with `NODE_ENV=prod`. 
 Credentials are in `config/prod.js` file

#### Local for development
***Important:*** check you have nodejs v6.11.\* and mongoDB v3.4.\*.

##### Step 1. Start backend
 For start backend: `npm run start.dev` 

##### Step 2. Init frontend
For init project you need:
```
 cd client 
 npm install
 ```  
##### Step 3. Start frontend 
 For the following runs use next commands: 
 ```
 npm start
 ```
 
 Note: Only for development. Client app connected with backend through proxy. 
 By default client app starts on `http://localhost:4200` and connects with backend by default `localhost:3000`.
 Angular cli proxy configuration: `client/proxy.conf.json`
 
 Or you can use for Docker-compose for development.
 
 #### Docker-compose
 *not necessary, just for dev mode*
 
***Important:*** check you have docker and docker-compose
 
 Use `Make` file for shortcuts. All commands `make help`

##### Step 1. Start backend 
 For start backend run `docker-compose up` or `make app`.

 If you need stop docker-compose containers use `make stop`
 
##### Step 2. Init frontend
For init project you need:
```
 cd client 
 npm install
 ```  
##### Step 3. Start frontend 
For the following runs use next commands: 
```
 npm start
```

## Technologies
- express js 
- angular 2
- RecordRTC
- Web Speech Api
- Google Speech Api
