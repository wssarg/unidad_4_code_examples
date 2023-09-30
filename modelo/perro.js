
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const perroSchema = new Schema({
    id: Number,
    color: String,
    raza: String,
    nombre: String
});

module.exports = mongoose.model("perro", perroSchema);


// perroSchema.pre("save", async (next) => {
//     const perro = this;

//     const perros = perro.find();
//     perro.id = (await perros).length + 1;

//     //let cantidad = await perro.countDocuments((err, count) => { count });
//     //perro.id = cantidad + 1;

//     next();
// });

// perroSchema.pre('save', async function (next) {
//     const perro = this;

//     try {
//         const count = await Perro.countDocuments({});
//         perro.id = count + 1;
//         next();
//     } catch (err) {
//         next(err);
//     }
// });
