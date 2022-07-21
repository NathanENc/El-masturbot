module.exports = {
    name: "play", //El nombre del comando//
    aliases: ["p"], //El alias//
    desc: "Escucha musica!",//Su descripción//
    run: async (client, message, args, prefix) => {

        //Comprobaciones previas//
        if(!args.length) return message.reply(`❌ **Especifica el nombre de la canción 🎵**`);//Si no pone el nombre de la canción//

        if(!message.member.voice?.channel) return message.reply(`❌ **Tienes que estar en un canal de voz**`);//Si no esta en un canal de voz//

        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __DONDE ESTOY__**`); //Si no esta en el mismo canal de voz//
        client.distube.play(message.member.voice?.channel, args.join(" "), {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
}
