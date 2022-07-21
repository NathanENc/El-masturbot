//Distube funciona para el modulo de musica//

const {DisTube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify');
const {SoundCloudPlugin} = require('@distube/soundcloud');
module.exports = (client, Discord) => {
    console.log(`Mudulo de Musica ha sido cargado`.yellow)

    client.distube = new DisTube(client, {
        emitNewSongOnly: false, //Poner nuevas canciones solamente//
        leaveOnEmpty: true, //Salir cuando ya no haya canciones en la cola//
        leaveOnFinish: false, //Salir cuando ya no haya más canciones por reproducir//
        leaveOnStop: true, //Si una canción da un error o no se puede reproducir saldra// 
        savePreviousSongs: true, //Guardar las canciones anteriores//
        emitAddSongWhenCreatingQueue: false, //Crear un evento de una canción cuando se añada a la cola//
        searchSongs: 0, //Busca cuantas canciones se han encontrado si es asi cambiar a 1//
        nsfw: true, //Poner canciones marcadas como explicitas o mayor a 18//
        emptyCooldown: 300, //Limite de tiempo en irse si no hay una canción en segundos//
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality:"highestaudio", //Calidad del audio//
            format: "audioonly", //Formato de video//
            liveBuffer: 60000, //procesos en los que pueda consumir
            dlChunkSize: 1024 * 1024 * 4,
        },
        youtubeDL: false,
        //nos ayudara a importar musica que no sea de youtube//
        plugins: [
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: true,
            }),
            new SoundCloudPlugin()
        ],
    });

//Lo que esta dentro del mensaje//

//Sonara la canción//
    client.distube.on("playSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setColor("#fcba03")//El color que tendra el banner//
            .setAuthor({ name: `Reproduciendo `}) //Titulo de lo que pondra al "reproducir"
            .setTitle(`${song.name}`) //Nombre de la canción//
            .setURL(song.url) //Link del video (esto estara en el nombre nombre de la canción)//      
            .setDescription(`\`[0:00 / ${song.formattedDuration}]\``) //Duración de la canción//
            .setThumbnail(song.thumbnail)//miniatura de la canción//
            .setFooter({text: `Añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({dynamic: true})})//Quien lo puso, la url es el avatar de quien la puso//
            ]
        })
    })

//Tendra una fila de canciones//
    client.distube.on("addSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setColor("#fcba03")//El color que tendra el banner//
            .setAuthor({ name: `Añadido a la cola `}) //Titulo de lo que pondra al "reproducir"
            .setTitle(`${song.name}`) //Nombre de la canción//
            .setURL(song.url) //Link del video (esto estara en el nombre nombre de la canción)//      
            .setDescription(`\`[0:00 / ${song.formattedDuration}]\``)//duración de la canción//
            .setThumbnail(song.thumbnail)//miniatura de la canción//
            .setFooter({text: `Añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({dynamic: true})})//Quien lo puso, la url es el avatar de quien la puso//
            ]
        })
    });
    //Skipeara la canción//
    client.distube.on("initQueue", (queue) =>{
        queue.autoplay = false; //Evita errores al saltar canciones// //Pero hace que se ponga canciones automaticamente//
    });
};
