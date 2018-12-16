const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const bot = index.bot;

module.exports = {
  name: "id",
  execute: (message, args) => {

    let err = bot.emojis.get('500814919344717854');

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`${err} **Insufficient Permission**\n\nMissing Permission - \`MANAGE_MESSAGES\``)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    let member = message.mentions.members.first();
    if(!member) return message.channel.send(`${err} • Please mention a valid user.`);

    let embed = new Discord.RichEmbed()
    .setAuthor(`${member.user.username}'s ID`, member.user.displayAvatarURL)
    .setDescription(`${member.user.id}`)
    .setColor(config.noembed);

    message.channel.send(embed);
  }
}
