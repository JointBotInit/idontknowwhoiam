const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;

module.exports = {
  name: "flip",
  execute: (message, args) => {

    let replies = ["Heads", "Tails"];

    let coin = bot.emojis.get(`501156881276862464`);

    let result = replies[Math.floor(Math.random()*replies.length)];

    message.channel.send(new Discord.RichEmbed().setColor(config.noembed).addField(`💰Result`, `_You flipped a coin...and it landed **${result}**._`));
  }
}
