const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const server = index.server;
const bot = index.bot;
const client = new Discord.Client()

module.exports = {
  name: "report",
  execute: async (message, args) => {

    let err = bot.emojis.get('500814919344717854');
    let sp =  "?";
    let chk = bot.emojis.get('500815339756584960');
    let rc = server[message.guild.id].reports;

    if(server[message.guild.id].reports === "undefined") {
      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`${err} **Invalid Operation**\n\n\`Report\` - Module is Disabled\n\n_Contact a server administrator to set this up_`)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    let member = message.mentions.members.first();
    let reason = args.join(" ").slice(22);
    let logs = message.guild.channels.find(c => c.id === rc);

    if(!member) {

      let embed = new Discord.RichEmbed()
      .setDescription(`${err} **Usage:** \`${sp}report <@user> [reason]\``)
      .setColor(config.noembed);
      message.channel.send(embed);
      return;
    }

    if(member.user.id === message.author.id) return message.channel.send(`${err} • Invalid Operation`);

    if(member.user.bot) return message.channel.send(`${err} • Invalid Operation`);

    if(!reason) {
      let embed = new Discord.RichEmbed()
      .setDescription(`${err} **Usage:** \`${sp}report <@user> [reason]\``)
      .setColor(config.noembed);
      message.channel.send(embed);
      return;
    }

    let chan = message.guild.channels.find(c => c.name === message.channel.name);

    let embed = new Discord.RichEmbed()
    .setTitle(`Gigabot Report System`)
    .addField(`User`, member.user)
    .addField(`Reported By`, `${message.author.username}#${message.author.discriminator}`)
    .addField(`Channel`, `${chan}`)
    .addField(`Reason`, `${reason}`)
    .setFooter(`ID: ${member.user.id}`)
    .setTimestamp()
    .setColor("#55acee");

    logs.send(embed);
    message.channel.send(`${chk} • Report for ${member.user} has been submitted.`);
    return;
  }
}
