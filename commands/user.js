const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;
const fs = require("fs");
const commandFiles = fs.readdirSync("./commands");
const date = require("date-and-time");

module.exports = {
  name: "user",
  aliases: ["userinfo"],
  execute: async (message, args) => {

    let member = message.mentions.members.first();

    if(member) {

      let udate = date.format(member.user.createdAt, 'MMM DD, YYYY');
      let jdate = date.format(member.joinedAt, 'MMM DD, YYYY');

      let embed = new Discord.RichEmbed()
      .setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL)
      .addField(`Account Created`, udate, true)
      .addField(`Joined ${message.guild.name}`, jdate, true)
      .addField(`Status`, member.user.presence.status, true)
      .setFooter(`${member.user.username}'s ID: ${member.user.id}`)
      .setTimestamp()
      .setColor(config.noembed);
      message.channel.send(embed);
      return;
    }

    let user = message.author;

    let udate = date.format(user.createdAt, 'MMM DD, YYYY');
    let jdate = date.format(message.member.joinedAt, 'MMM DD, YYYY');

    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL)
    .addField(`Account Created`, udate, true)
    .addField(`Joined ${message.guild.name}`, jdate, true)
    .addField(`Status`, user.presence.status, true)
    .setFooter(`${user.username}'s ID: ${user.id}`)
    .setTimestamp()
    .setColor(config.noembed);
    message.channel.send(embed);
  }
}
