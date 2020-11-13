# giphy-discord-bot
A simple discord bot to deliver GIFs from the GIPHY API, either based on a search term or a random GIF. Occasionally reacts to your commands.

## Installation
* Create your Discord application and bot through the Discord developer portal: https://discord.com/developers/applications
* Sign up to use the GIPHY API: https://developers.giphy.com/docs/api
* Add your Discord bot token and GIPHY API key to the `.env` file. A sample is provided in `.env_sample`.
* Run with `node index.js`.

## Dependencies
Uses the following npm packages, can be installed with with `npm install PACKAGE_TO_INSTALL`:
* discord.js
* node-fetch
* dotenv
