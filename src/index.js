const Discord = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const BOT_COMMAND = '!gif';

const client = new Discord.Client();


client.login(DISCORD_BOT_TOKEN)
.catch(err => console.error(err));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});




client.on('message', (msg) =>{


    if(msg.content.toLowerCase().startsWith(BOT_COMMAND))
    {
        if(Math.random() > 0.8)
        {
            msg.react("❤️");
        }
        
        if (msg.content.toLowerCase() != BOT_COMMAND)
        {
            const search_term = msg.content.substring(BOT_COMMAND.length).trimStart();

            get_gif(search_term)
            .then(img => {
                if(msg.channel.id === '545031442065915955')
                {
                    msg.channel.send("", {files: [`${img}`]});
                }
                else
                {
                    msg.channel.send(`${img}`);
                }
            })
            .catch(err => {
                console.error(err)
                msg.channel.send(`Couldn't find any GIFs for that 😢`);   
            });
        }
        else
        {
            // give random gif!
            random_gif()
            .then(img => {
                if(msg.channel.id === '545031442065915955')
                {
                    msg.channel.send("", {files: [`${img}`]});
                }
                else
                {
                    msg.channel.send(`${img}`);
                }
            })
            .catch(err => console.error(err));
        }
        
    }
});



async function get_gif(search_term)
{
    const query_term = encodeURIComponent(search_term);

    const giphy_response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query_term}&limit=10&offset=0&rating=pg-13&lang=en`);
    const giphy_json = await giphy_response.json();

    if(giphy_json.data.length > 0)
    {   
        const rand = Math.floor(Math.random()*(Math.min(giphy_json.data.length, 10)));
        const img_url = giphy_json.data[rand].images.fixed_height.url;
        return img_url;
    }
    else
    {
        throw new Error("No GIFs available");
    }
    

    
}


async function random_gif()
{
    const giphy_response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=&rating=pg-13`);
    const giphy_json = await giphy_response.json();
    const img_url = giphy_json.data.images.fixed_height.url;

    return img_url;
}
