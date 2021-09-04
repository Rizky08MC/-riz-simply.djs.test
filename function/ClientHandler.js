const Discord = require('discord.js');
const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob)

async function ClientHandler(client, commandfile, eventfile, slashcommandfile, guildid) {
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  
  const commandFiles = await globPromise(`${process.cwd()}/${commandfile}/**/*.js`);
  if(!commandfile) throw new Error("Error cannot find command file")
  
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];
    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
    if (file.aliases && Array.isArray(file.aliases)) {
      file.aliases.forEach((alias) => client.aliases.set(alias, file.name));
    }
    console.log(file.name, "Loaded ✔️");
  });
  
  const eventFiles = await globPromise(`${process.cwd()}/${eventfile}/*.js`);
    eventFiles.map((value) => require(value));
    
  if(!eventFiles) throw new Error("Error cannot find event file")
  
  const slashCommands = await globPromise(
        `${process.cwd()}/${slashcommandfile}/*/*.js`
    );
    
  if(!slashCommands) throw new Error("Error cannot find slash command file");

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if(["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    
  client.on("ready", async () => {
        await client.guilds.cache.get(`${guildid}`).commands.set(arrayOfSlashCommands);
    });
}

module.exports = { ClientHandler };
