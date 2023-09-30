
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const perroSchema = new Schema({
    id: Number,
    color: String,
    raza: String,
    nombre: String
});

module.exports = mongoose.model("perro", perroSchema);

