const Discord = require('discord.js');

function ClientMessage(client) {
  client.on('messageCreate', async(message) => {
    const prefix = client.prefix;
    if(message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
    
    const [cmd, ...args] = messsge.content
    .slice(prefix.length)
    .trim()
    .split(" ");
    
    const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));
    
    if(!command) return;
    await command.run(client, message, args);
  })
}

module.exports = { ClientMessage };
