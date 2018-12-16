
const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require("../index.js");
const server = index.server;
const bot = index.bot;

module.exports = {
  name: "saye",
  execute: async (message, args) => {

    if(!message.member.roles.some(r=>["Owner", "Admin", "Moderator", "CoLeader", "Mod", "Developer"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

      const sayMessage = args.join(" ");

      let servIcon = message.guild.iconURL;
      let esayEmbed = new Discord.RichEmbed()
      .setTitle(`Say Command`)
      .setColor("#0537ff")
      .setDescription(`Message from ${message.author}`)
      .addField("Message:", `${sayMessage}`)
      .setTimestamp();

      const esayMessage = args.join(" ");
      // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
      message.delete().catch(O_o=>{});
      // And we get the bot to say the thing:

      message.channel.send(esayEmbed);
  }
};