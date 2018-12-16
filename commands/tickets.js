const Discord = require("discord.js");

module.exports = {
    name: "ticket",
    execute: (bot, message, args) => {
	
	let channelticket = `t-${message.author.username}-${message.author.discriminator}`
    message.guild.createChannel(`t-${message.author.username}-${message.author.discriminator}`, 'text'
    [{
        id: `${message.author.username}`,
        deny: ['READ_MESSAGES'],
        allow: ['SEND_MESSAGES']
      }])

      .then(channel => {
        channel.overwritePermissions(message.guild.defaultRole, {
            'VIEW_CHANNEL': false
        })
         .then(updated => console.log('Done!'))
         .catch(error => console.log(error));
        
            channel.overwritePermissions(`${message.author.id}`, {
            'VIEW_CHANNEL': true,
            'READ_MESSAGES': true,
            'SEND_MESSAGES': true
        })
         .then(updated => console.log('Done!'))
         .catch(error => console.log(error));
		 
		  let tickembed = new Discord.RichEmbed()
		  .setTitle("Tickets")
		  .setColor("RANDOM")
		  .setTimestamp()
		  
		  .setDescription("Thank you for making a Ticket, Please State The Reason you Created a ticket")
		  .setFooter("2018 © Gigabot")
		  
		  channel.send(tickembed)		 
		 
        });


  let embed = new Discord.RichEmbed()
  .setTitle("Tickets")
  .setColor("RANDOM")
  .setTimestamp()
  .setDescription("Thank you for making a Ticket, a Staff Member will be with you shortly")
  .setFooter("2018 © Gigabot")

  return message.channel.send(embed)
}};