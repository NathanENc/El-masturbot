const Discord = require('discord.js');
module.exports = {
    name: "queue", //Como se llamara el comando//
    aliases: ["q", "cola"], //El alias del comando//
    desc: "Te muestra las canciones siguientes", //La descripción del comando//
    run: async (client, message, args, prefix) => {
        
        //comprobaciones previas//
        const queue = client.distube.getQueue(message);

        if (!queue) return message.reply(`**No hay ninguna canción reproduciéndose!**`); //Si no pone el nombre de la canción pondra//

        if (!message.member.voice?.channel) return message.reply(`❌ **Tienes que estar en un canal de voz**`); //Si no esta en un canal pondra//

        if (message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`); 

        let listaqueue = []; //Se crea una array donde se guardan todas las canciones//
        var maximascanciones = 10; //El maximo de canciones que se van a mostrar por pagina//

        //Mapeamos las canciones y se introducen en  la array listaqueue//
        for (let i = 0; i < queue.songs.length; i += maximascanciones) {
            let canciones = queue.songs.slice(i, i + maximascanciones); //Separa las canciones//
            listaqueue.push(canciones.map((cancion, index) => `**${i + ++index}** - **[${cancion.name}](${cancion.url})**
            \`(${cancion.formattedDuration})\``).join("\n ")); //Representara las canciones en forma de lista//
        }

        var limite = listaqueue.length  //Numero cantidad de raids que se ha obtenido//
        var embeds = []; //Se hace un embed para la lista//

        //Hacemos un loop entre todas las canciones hasta el límite
        for (let i = 0; i < limite; i++) {
            let desc = String(listaqueue[i]).substring(0, 2048); //Limita 2048 caracteres de texto para evitar errores//
            
            //Se crea un embed por cada 10 canciones//
            let embed = new Discord.MessageEmbed()
                .setAuthor ({name: "Lista de reproducción", iconURL: 'https://cdn.shopify.com/s/files/1/0899/2262/files/710.png?v=1579826835' })
                .setColor("#fcba03")
                .setDescription(desc)
                .addFields(
                {name:`Hay ${queue.songs.length} canciones en espera`, value: "ㅤ"},
                {name: "Ahora...", value:`**[${queue.songs[0].name}](${queue.songs[0].url})**`},
                )

             //Si la cantidad de la canciones mostrada es >1 entonces especificar que canción se esta escuchando//
            if (queue.songs.length > 1) embed.setTitle(`💿  Lista de canciones`)
            await embeds.push(embed)
        }
        return paginacion();

        //Función para poner botones en la musica//
        async function paginacion() {    //Se define el nombre, en este caso paginación// 
            let paginaActual = 0;   //Una función que sea la pagina actual//

        //Si la cantidad de embeds es 1, se envia el mensaje sin botones//
        if (embeds.length === 1) return message.channel.send({ embeds: [embeds[0]] }).catch(() => { });

            //Si el numero de embeds es >1, pondran los botones//
            let boton_atras = new Discord.MessageButton().setStyle('SUCCESS').setCustomId('Atrás').setEmoji('⬅').setLabel('Atrás')
            let boton_inicio = new Discord.MessageButton().setStyle('DANGER').setCustomId('Inicio').setEmoji('🏠').setLabel('Inicio')
            let boton_siguiente = new Discord.MessageButton().setStyle('SUCCESS').setCustomId('Siguiente').setEmoji('➡').setLabel('Siguiente')
            
            //Enviar embed con los botones//
            let embedpaginas = await message.channel.send({
                content: `**Haz click en los __Botones__ para cambiar de páginas**`,
                embeds: [embeds[0].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })],
                components: [new Discord.MessageActionRow().addComponents([boton_atras, boton_inicio, boton_siguiente])]
            });

            //Se creara un boton de interación//
            const collector = embedpaginas.createMessageComponentCollector({ filter: i => i?.isButton() && i?.user && i?.user.id == message.author.id && i?.message.author.id == client.user.id, time: 120000 }); // Se crea un temporizador en milisegundos 1seg = 1000//

            //Escuchamos los eventos del collector
            collector.on("collect", async b => {
                //Si el usuario hace click al boton no es el mismo que ha escrito el comando respondera...//
                if (b?.user.id !== message.author.id) return b?.reply({ content: `**Solo la persona que ha escrito \`${prefix}queue\` puede cambiar de páginas!` });

                switch (b?.customId) {
                    case "Atrás": {
                        //Resetemamos el tiempo del collector
                        collector.resetTimer();
                        //Si la pagina a retroceder no es igual a la primera pagina entonces retrocedemos
                        if (paginaActual !== 0) {
                            //Resetemamos el valor de pagina actual -1
                            paginaActual -= 1
                            //Editamos el embeds
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        } else {
                            //Reseteamos al cantidad de embeds - 1
                            paginaActual = embeds.length - 1
                            //Editamos el embeds
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        }
                    }
                        break;

                    case "Inicio": {
                        //Resetemamos el tiempo del collector
                        collector.resetTimer();
                        //Si la pagina a retroceder no es igual a la primera pagina regresamos//
                        paginaActual = 0;
                        await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                        await b?.deferUpdate();
                    }
                        break;

                    case "Siguiente": {
                        //Resetemamos el tiempo del collector
                        collector.resetTimer();
                        //Si la pagina a avanzar no es la ultima, entonces avanzamos una página
                        if (paginaActual < embeds.length - 1) {
                            //Aumentamos el valor de pagina actual +1
                            paginaActual++
                            //Editamos el embeds
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        //En caso de que sea la ultima, volvemos a la primera
                        } else {
                            //Reseteamos al cantidad de embeds - 1
                            paginaActual = 0
                            //Editamos el embeds
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        }
                    }
                        break;

                    default:
                        break;
                }
            });
            collector.on("end", () => { //Si el colector termina//
                //Desactivar los botones//
                embedpaginas.components[0].components.map(boton => boton.disabled = true)
                embedpaginas.edit({content: `El tiempo ha expirado! escribe de nuevo \`${prefix}queue\``, embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
            });
        }
    }
}
