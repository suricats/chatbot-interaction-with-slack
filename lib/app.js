const config = require('../config.js');
const util = require('../helper/util.js');
const handleMessage = require('./handle_message');
const restify = require('restify');
const builder = require('botbuilder');
const SlackBot = require('slackbots');
//TODO Les sessions pourront être stockées en bdd
const sessionStore = {};

// Connection to Microsoft Bot Framework
const connector = new builder.ChatConnector({
  appId: config.appId,
  appPassword: config.appPassword
});

/******             BOT                 ******/
const bot = new builder.UniversalBot(connector);

/******             SLACKBOT            ******/
const slackbot = new SlackBot({
    token: config.botTokenSlack, // Add a bot https://my.slack.com/services/new/bot and put the token
    name: config.botNameSlack
});

slackbot.on('start', function() {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  const params = {
      icon_emoji: ':cat:'
  };

  // Event when Message received
  bot.dialog('/', [
      function (session) {
          if(session.message.source != 'slack'){
            session.replaceDialog('/postSlack');
          }else{
            session.replaceDialog('/responseToClient');
          }
      }
  ]);

  bot.dialog('/postSlack', [
      function (session) {
        userId = session.message.user.id;
        sessionStore[userId] = session;
        messageText = (session.message.source == 'webchat') ? '@' + userId + ' : ' + session.message.text
        : '[' + session.message.user.name + '] ' + '@' + userId + ' : ' + session.message.text;
        // define channel, where bot exist. You can adjust it there https://my.slack.com/services
        slackbot.postMessageToChannel(config.slackChannel, messageText, params).then(function(data){
          //Lors du premier message côté client, on lui répond par un message de bienvenue
          if(!session.userData.profile){
            let answer = [util.toText('Bienvenue dans la tribu Suricat !!!')];
            answer.push(util.toText('Votre message a bien été envoyé à nos équipes, attendez quelques instants ;)'));
            answer.forEach(function(message){
              handleMessage.sendMessageByType[message.type](session, message);
            });
            session.userData.profile = { id : userId, name : session.message.user.name };
          }
        });
      }
  ]);

  bot.dialog('/responseToClient', [
      function (session) {
        let answer = [];
        let textMessage = session.message.text;
        userId = util.extractUserIdFromMessage(textMessage);
        if(userId !== null){
          if(!sessionStore[userId]){
            answer.push(util.toText('L\'utilisateur n\'est pas ou plus stocké sur le serveur dsl... Internet ce n\'est plus ce que c\'était :sweat_smile:' ));
          }else{
            session = sessionStore[userId];
            //On clean le message
            answer.push(util.toText(textMessage.replace("@"+userId, "")));
          }
        }else{
          answer.push(util.toText('Grand malheur :scream_cat: ! Comment veux-tu que je transmette un message sans avoir le nom du destinataire ? Exemple : @azerty hello content de revoir'));
        }
        answer.forEach(function(message){
          handleMessage.sendMessageByType[message.type](session, message);
        });
      }
  ]);
});

/******                  SERVER             ******/
// Server Init
const server = restify.createServer();
server.listen(config.port);
server.post('/', connector.listen());
