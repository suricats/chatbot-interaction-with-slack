const builder = require('botbuilder');

const handleMessage = {
  sendMessageByType: {
    image: function(session, elem) {
      session.send(new builder.Message().addAttachment({
      contentType: 'image/png',
      contentUrl: elem.content,
    }));
    },
    text: function(session, elem){
      session.send(elem.content);
    },
    buttons : function(session, elem){
      const buttons = elem.content.map(function(button) {
        return (new builder.CardAction().title(button.title).type('imBack').value(button.value));
      });
      const card = new builder.ThumbnailCard().buttons(buttons).subtitle(elem.title);
      session.send(new builder.Message().addAttachment(card));
    }
  }
}

module.exports = handleMessage;
