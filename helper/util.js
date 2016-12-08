const util = {
  toText : function(message) {
    return { type: 'text', content: message };
  },
  toImage : function(image) {
    return { type: 'image', content: image };
  },
  toButtons : function(title, buttons){
    return { type: 'buttons', content: buttons, title }
  },
  toButton : function(title, value){
    return { title, value }
  },
  cleanText: function(text) {
    return text.replace(/[\.;,:\?!]/gi, ' ');
  },
  extractUserIdFromMessage : function (textMessage) {
    const split = textMessage.split(' ');
    let userId = null;
    split.forEach(function(word){
      if(word.startsWith("@")){
        userId =  word.replace("@", "");
        return false;
      }
    });
    return userId;
  },
};

module.exports = util;
