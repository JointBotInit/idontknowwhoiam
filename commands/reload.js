const Discord = require('discord.js');
const config = require('../storage/config.json');
const index = require('../index.js');
const bot = index.bot;
const server = index.server;

module.exports = {
  name: "reload",
  aliases: ["reboot"],
  execute: (message, args) => {

    let sp =  server [message.guild.id].prefix;


if (message.author.id !== "325375993013338113") return message.channel.send("Sorry, this command is for owner only!");

try {
    delete require.cache[require.resolve(`./${args[0]}.js`)];
} catch (e) {
    return message.channel.send(`Unable to "reload": ${args[0]}`);
}

message.channel.send(`The command ${args[0]} has been reloaded!`)


}};