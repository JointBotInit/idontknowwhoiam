const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const server = index.server;
const bot = index.bot;

module.exports = {
  name: "ban",
  execute: async (message, args) => {

    let err = bot.emojis.get('500814919344717854');
    let sp =  server [message.guild.id].prefix;
    let chk = bot.emojis.get('500815339756584960');

    if(!message.member.hasPermission("BAN_MEMBERS")) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`${err} **Insufficient Permission**\n\nMissing Permission - \`BAN_MEMBERS\``)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    let member = message.mentions.members.first();
    var reason = args.join(" ").slice(22);
    var logs = server [message.guild.id].logs;

    if(!member) {

      let embed = new Discord.RichEmbed()
      .setDescription(`⛔ **Usage:** \`${sp}ban <@user> [reason]\``)
      .setColor(config.noembed);

      message.channel.send(embed);
      return;
    }

    if(member.user.id === message.author.id) return message.channel.send(`${err} • Invalid Operation`);

    if(member.highestRole.position >= message.member.highestRole.position) return message.channel.send(`${err} • Insufficient Permission`);

    if(!reason) {
      var reason = "No Reason";
    }

    if(server[message.guild.id].logs != "undefined") {
      var logs = message.guild.channels.find(c => c.id === logs);
      let embed = new Discord.RichEmbed()
      .setTitle(`Action • Ban`)
      .addField(`User`, member.user, true)
      .addField(`Moderator`, `${message.author.username}#${message.author.discriminator}`, true)
      .addField(`Reason`, `${reason}`, true)
      .setFooter(`ID: ${member.user.id}`)
      .setTimestamp()
      .setColor("#55acee");

      await member.ban();
      logs.send(embed);
      message.channel.send(`${chk} • **${member.user.username}#${member.user.discrimintator}** was banned for **${reason}**`);
      return;
    }

    await member.ban();

    message.channel.send(`${chk} • **${member.user.username}#${member.user.discrimintator}** was banned for **${reason}**`);
  }
}
