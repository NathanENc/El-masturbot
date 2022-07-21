const schema = require(`${process.cwd()}/modelos/servidor.js`)

//Se exportara el modulo//
module.exports = {
    name: "prefix", //Nombre que tendra el comando//
    aliases: ["prefijo", "cambiarprefijo", "cambiarprefix"], //Son los otros nombres en las que se podra poner el comando//
    desc: "Cambia el prefijo del servidor", //Es la descripción que tiene//

    run: async (client, message, args, prefix) => {
        
        if(!args[0]) return message.reply(`Tienes que especificar el prefijo`) //Por si no completa el prefijo pondra este mensaje//
        await schema.findOneAndUpdate({guildID: message.guild.id}, {
            prefijo: args[0]
        })
        return message.reply(`Cambiando el Prefijo de \`${prefix}\` a \`${args[0]}\``) //Lo que pondra al cambairse//
    }
}