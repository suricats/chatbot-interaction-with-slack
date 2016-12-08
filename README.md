# chatbot-interaction-with-slack

Ce POC vous permettra d'intéragir entre différents services (Messenger, Kik, Chat Microsoft, skype) et un channel SLACK de votre choix.

## Get your Recast.AI Bot Token

* Log in to your Recast.AI account
* Go to https://recast.ai
* Create or fork a BOT
* Then on your profile, choose your fresh forked Bot
* On the bottom, in the curl request is your precious Token

## Get your Microsoft secret

* Create an account on [Microsoft Bot Framework](https://dev.botframework.com/)
* Create a new Bot and follow the procedure. The callback Url you have to put will be explain later.
* During the process, you'll have to create a Microsoft App: keep your Secret and AppId, they will be used later
* Follow the differents steps for every channel you want to add.

## Put your local server Online

```
./ngrok http 80
```

this terminal is now used by ngrok and you can see your full Url that is required on microsoft bot Platform

## Launch chatbot-interaction-with-slack

#### Complete the config.js

* Clone this Repository

```
git clone https://github.com/suricats/chatbot-interaction-with-slack
```

* Fill the config.js with your data

```
const config = {
  appId: 'MICROSOFT_BOT_CONNECTOR_APP_ID',
  appPassword: 'MICROSOFT_BOT_CONNECTOR_PASSWORD',
  recastAccessToken : 'RECAST_TOKEN', (Not mandatory)
  botTokenSlack : 'SLACK_BOT_API_TOKEN',
  botNameSlack : 'SLACK_BOT_NAME',
  slackChannel : 'CHANNEL',
  port : 80
};
```

#### Run

* install the dependencies

```
npm install
```

* run chatbot

```
npm run start
```
