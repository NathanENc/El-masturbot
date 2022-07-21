
//Es el servidor en el que funciona el bot//
const mongoose = require('mongoose');
const serverSchema = new mongoose.Schema({
    guildID: String,
    prefijo: String,
})

const model = mongoose.model("ConfigServer", serverSchema);

module.exports = model;
//Asi no tendras que andar de mamador por si tu internet es una mierda//