const Discord = require('discord.js');

function ClientLogin(client) {
  client.login(client.token)
  console.log(`${client.user.tag} Ready`)
}

module.exports = { ClientLogin };
