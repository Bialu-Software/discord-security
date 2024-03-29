![Color=Green](https://user-images.githubusercontent.com/70224036/229851422-02542171-4bb9-475c-bc78-cfd319ab783e.png)

## Lightweight, fast and minimalist security solution for [discord.js](https://discord.js.org/).

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
  const security_config = {}

  security.antiraid(client, message, security_config)
})

client.login("<token>");

```

## Configuration

For the `security_config` is more options than in examples above.

```js
  const security_config = {
    active: false, // if you want antiraid to be turned off
    log_channel: "926173986751123516", // log channel for ban messages etc...
    ban_message: `${message.author.tag} has been banned because..`, // custom message
    react_to_bots: false // if you dont want antiraid to react to bots
  }
  
  console.log(security.version) // log your current version of package
```

## Contributing

[Contributing Guide](https://github.com/Bialu-Software/Discord-Security/blob/main/CONTRIBUTING.md)

<a href="https://github.com/Bialu-Software/" ><img width="223" hspace="10" alt="Powered by Bialu Software" src="https://media.discordapp.net/attachments/1055532722304585765/1069690405425254420/blue-icon.png?width=602&height=80"> </a>
