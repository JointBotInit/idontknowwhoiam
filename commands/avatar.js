const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;

module.exports = {
  name: "avatar",
  execute: (message, args) => {

    if(args.length < 1) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
      .setImage(message.author.displayAvatarURL)
      .setColor(config.noembed);

      message.channel.send(embed);
      return;
    }

    let member = message.mentions.members.first();

    let err = bot.emojis.get('500814919344717854');

    if(!member) return message.channel.send(`${err} • Could not find the provided user.`);

    let embed = new Discord.RichEmbed()
    .setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL)
    .setImage(member.user.displayAvatarURL)
    .setColor(config.noembed);

    message.channel.send(embed);
  }
}
