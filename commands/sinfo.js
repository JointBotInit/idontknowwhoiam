const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;
const date = require("date-and-time");

module.exports = {
  name: "sinfo",
  aliases: ["serverinfo"],
  execute: (message, args) => {

    let medi = bot.users.get(`${config.medi}`);
    let franix = bot.users.get(`${config.franix}`);

    const edate = date.format(message.guild.createdAt, 'MMM DD, YYYY');

    let embed = new Discord.RichEmbed()
    .setTitle(`${message.guild.name}`)
    .addField(`👑 Guild Owner`, `${message.guild.owner}`, true)
    .addField(`📆 Guild Created`, `${edate}`, true)
    .addField(`🌐 Guild Region`, `${message.guild.region}`, true)
    .addField(`👥 Guild Members`, `Count: \`${message.guild.memberCount}\``, true)
    .addField(`🔗 Large Guild`, `${message.guild.large}`, true)
    .addField(`🔒 Verified`, `${message.guild.verified}`, true)
    .setFooter(`ServerID: ${message.guild.id}`)
    .setTimestamp()
    .setColor(config.noembed);
    message.channel.send(embed);
  }
}
