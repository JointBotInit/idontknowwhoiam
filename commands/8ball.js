const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;

module.exports = {
  name: "8ball",
  execute: (message, args) => {

    let err = bot.emojis.get('500814919344717854');

    if(!args[2]) {
      message.channel.send(`${err} • Please ask me a full question.`);
      return;
    }

    let replies = ["Yeah, whatever keeps you smiling.", "Don't count on it.", "I don't know.", "Signs are pointing to yes.", "Reply is hazy, try again."];

    let result = replies[Math.floor(Math.random()*replies.length)];

    message.channel.send(new Discord.RichEmbed().setColor(config.noembed).addField(`:8ball: Answer`, `_${result}_`));
  }
}
