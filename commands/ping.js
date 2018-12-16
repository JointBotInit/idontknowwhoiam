const Discord = require('discord.js')
module.exports = {
    name: "ping",
    execute: async (bot, message, args, color ) => {

    let start = Date.now(); message.channel.send(message.channel.id, 'Pong! ').then(message => { 
    let diff = (Date.now() - start); 
    let API = (bot.ping).toFixed(2)
        
        let embed = new Discord.RichEmbed()
        .setTitle(`🔔 Pong!`)
        .setColor(0xff2f2f)
        .addField("📶 Latency", `${diff}ms`, true)
        .addField("💻 API", `${API}ms`, true)
        message.edit(embed);
      
    });

    }}