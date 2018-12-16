const Discord = require('discord.js');
const index = require("../index.js");
const server = index.server;
const config = require("../storage/config.json");
const fs = require("fs");
const bot = index.bot;
const randomPuppy = require('random-puppy');
const request = require('snekfetch');

module.exports = {
  name: "nude",
  execute: async (message, args) => {

    let err = bot.emojis.get('500814919344717854');

    if(server[message.guild.id].nsfw === false) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`❌ **Invalid Operation**\n\n\`NSFW\` - Module is Disabled`)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    if(!message.channel.nsfw) return message.channel.send(`❌ • Channel is not set to NSFW.`);

    var subreddits = [
      'pussy',
      'boobs',
      'perfectasses',
      'rearpussy',
      'ass',
      'collegesluts',
      'NSFW_Snapchat'
    ]

    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    await randomPuppy(sub)
    .then(async url => {
      if(!url) return message.channel.send(`❌ • Could not obtain any results.`);
      let embed = new Discord.RichEmbed()
      .setImage(url)
      .setColor(config.noembed);

      message.channel.send(embed);
    })
  }
}
