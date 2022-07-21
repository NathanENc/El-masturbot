const Discord = require('discord.js');
const config = require('./config/config.json')
require('colors')
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    ],
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//Anticlash// //Anti apagar//
process.on('unhandledRejection', error => {
    console.error(error);
});

client.on('shardError', error => {
    console.error(error);
}); 


//Se debe poner las funciones que se agregan, ejemplo si pones distube es para youtube//
function requerirhandlers(){    
    ["command", "events", "distube"].forEach(handler => {
        try {
            require(`./handlers/${handler}`)(client, Discord)
        } catch(e){
            console.warn(e)
        }
    })
}
requerirhandlers();

//Se especifica el token))

client.login(process.env.token).catch(() => console.log(`-[X]- NO HAS ESPECIFICADO UN TOKEN VALIDO -[X]-`.red))