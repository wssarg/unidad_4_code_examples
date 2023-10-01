
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const perroSchema = new Schema({
    id_perro: {
        type: Number,
        primaryKey: true,
        unique: true, // asegura que los valores sean unicos
        required: false, // le pongo false porque viene sin id_perro desde afuera
    },
    color: String,
    raza: String,
    nombre: String
});
perroSchema.pre('save', function (next) {
    const doc = this;
    // Encuentra el valor máximo actual en la colección y suma 1
    mongoose
        .model('perro', perroSchema)
        .findOne({}, 'id_perro')
        .sort({ id_perro: -1 })
        .then((result) => { // se usa then en lugar de exec por el uso de promesas
            if (!result) {
                doc.id_perro = 1;
            } else {
                doc.id_perro = result.id_perro + 1;
            }
            next();
        });
});

module.exports = mongoose.model("perro", perroSchema);
