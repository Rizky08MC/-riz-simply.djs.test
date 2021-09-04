const Discord = require('discord.js');

function ClientCreate(client, token, prefix) {
  client.token = token;
  client.prefix = prefix;
}

module.exports = { ClientCreate}
