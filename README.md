<p align="center">
  <a href="" rel="noopener">
 <img width=400px height=400px src="https://cdn.discordapp.com/attachments/867078961799102474/898600193501564938/Bialu-logo-update.png" alt="Bialu Software logo"></a>
</p>

Lightweight, fast and minimalist security solution for [discord.js](https://discord.js.org/).

```js
//import
const security = require("bialu-discord-security")

// use with Discord.js V13
client.on("messageCreate", (message) => {
  const security_config = { active: true }
  
  security.antiraid(client, message, security_config)
})
```

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)

```bash
$ npm install bialu-discord-security
```

## Features

  * Fast reaction time
  * Great for all types of projects (small, medium, large)
  * Ultra lightweight security solution

### Security Issues

If you discover a security vulnerability, please contact us on [Github](https://github.com/Bialu-Software/Discord-Security/issues) or on our [Discord server](https://discord.gg/em8meadJ2X)

## Quick Start

```js
const { Client, Intents } = require('discord.js');
const security = require("bialu-discord-security")

const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
    ],
  })

client.once('ready', () => {
	console.log('Ready!');
});

client.on("messageCreate", (message) => {
  const security_config = {
    active: true,
    log_channel: "926173986751123516", //only if you have bot for one server or handler (comming soon)
  }

  security.antiraid(client, message, security_config)
})

client.login("<token>");

```

## Configuration

For the `security_config` is more options than in examples above.

```js
  const security_config = {
    active: true, // if you want antiraid to be active
    log_channel: "926173986751123516", // log channel for ban messages etc...
    ban_message: `${message.author.tag} has been banned because..`, // custom message
    react_to_bots: false // if you dont want antiraid to react to bots
  }
  
  console.log(security.version) // log your current version of package
```

## Contributing

[Contributing Guide](https://github.com/Bialu-Software/Discord-Security/blob/main/CONTRIBUTING.md)
