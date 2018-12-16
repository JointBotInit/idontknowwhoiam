const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const server = index.server;
const bot = index.bot;
const chalk = require("chalk");

module.exports = {
  name: "clear",
  aliases: ["purge"],
  execute: async (message, args) => {

    let err = bot.emojis.get('500814919344717854');
    let sp =  server [message.guild.id].prefix;
    let chk = bot.emojis.get('500815339756584960');

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`)
      .setDescription(`${err} **Insufficient Permission**\n\nMissing Permission - \`MANAGE_MESSAGES\``)
      .setColor(config.error);
      message.channel.send(embed);
      return;
    }

    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);

    if (!amount) return message.channel.send(new Discord.RichEmbed().setColor(config.noembed).setDescription(`${err} **Usage** \`${sp}clear [@user] <#>\``));

    if (!amount && !user) return message.channel.send(new Discord.RichEmbed().setColor(config.noembed).setDescription(`${err} **Usage** \`${sp}clear [@user] <#>\``));

    if (amount > 100) return message.channel.send(`${err} • Number must be between 1 - 100.`);

    await message.delete();

    message.channel.fetchMessages({
      limit: 100,
    }).then(async (messages) => {

      if (user) {
        const filterBy = user ? user.id : client.user.id;

        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        message.channel.bulkDelete(messages).catch(error => console.log(chalk.red(`[ERROR] ${error.stack}`)));

        message.channel.send(`${chk} • [**${amount}**] Message(s) Cleared`)
        .then(msg => msg.delete(4000));
        return;
      }

      if (!user) {
        message.channel.bulkDelete(amount).catch(error => message.channel.send(chalk.red(`[ERROR] ${error.stack}`)));

        message.channel.send(`${chk} • [**${amount}**] Message(s) Cleared`)
        .then(msg => msg.delete(4000));
        return;
      }
    });
  }
}
