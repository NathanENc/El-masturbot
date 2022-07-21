module.exports = {
    name: "skip", //Como se llamara el comando//
    aliases: ["saltar", "next", "n"], //El alias del comando//
    desc: "Salta la canción", //La descripción del comando//
    run: async (client, message, args, prefix) => {
        //comprobaciones previas//
        const queue = client.distube.getQueue(message);
        if(!queue) return message.reply(`❌ **No hay ninguna canción reproduciendose 🎶**`); //Si no pone el nombre de la canción pondra//

        if(!message.member.voice?.channel) return message.reply(`❌ **Tienes que estar en un canal de voz**`);//Si no esta en un canal pondra//

        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __DONDE ESTOY__**`);//Si no esta en el mismo canal//

        if(!queue.autplay && queue.songs.length <= 1) return message.reply(`Lo siento no hay más canciones en la cola!`)//Si se da un next cuando no haya canciones evitara un crasheo//
        
        client.distube.skip(message);
        message.reply(`**Canción saltada** ⏭`)
    }
}
