const Discord = require('discord.js');

//Se exportara el modulo//
module.exports = {
    name: "ping", //Nombre del comando//
    aliases: ["latencia", "ms"], //Sus prefijos//
    desc: "Puedes ver la latencia del bot", //La descripción del comando//
    run: async (client, message, args, prefix) => {
    
    const embed = new Discord.MessageEmbed()
        .setColor("fcba03") //El color del banner que tendra//
        .setTitle("Pong 🏓") //El titulo//
        .setDescription(`⌛ **Mi ping es de** \`${client.ws.ping}\` ms`) //Lo que tendra dentro//
        .setTimestamp()
        .setFooter({text: "v0.1.2", iconURL: 'https://cdn.shopify.com/s/files/1/0899/2262/files/710.png?v=1579826835' });
    message.reply({ embeds: [embed] })//Enviara el mensaje//
    }
}

