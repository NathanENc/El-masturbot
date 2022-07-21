module.exports = {
    name: "stop", //Como se llamara el comando//
    aliases: ["desconectar", "leavevc", "leave", "disconnect"], //El alias del comando//
    desc: "Desconecta al bot", //La descripción del comando//
    run: async (client, message, args, prefix) => {
        //comprobaciones previas//
        const queue = client.distube.getQueue(message);

        if(!queue) return message.reply(`❌ **No hay ninguna canción reproduciendose 🎶**`); //Si no pone el nombre de la canción pondra//

        if(!message.member.voice?.channel) return message.reply(`❌ **Tienes que estar en un canal de voz**`);//Si no esta en un canal pondra//

        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __DONDE ESTOY__**`);
        
        client.distube.stop(message);
        message.reply(`**Bye cuidate >_<** 🌹`)
    }
}
