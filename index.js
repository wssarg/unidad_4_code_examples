require("dotenv").config();
const express = require("express");
const perros = require("./router/perros"); // Este es un router

const app = express();

//Middleware
app.use(express.json())

// Middleware Rutas a categorias
app.use("/api/perros", perros)

// Control de rutas inexistentes
app.use('*', (req, res) => {
    res.status(404).send({ error: `La URL indicada no existe en este servidor` });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.log(err)
    res.send(err)
})

const PORT = process.env.PORT || 3030;
const server = app.listen(PORT, () => {
    console.log(`Servidor APP corriendo en puerto ${PORT}`)
})

module.exports = { app, server }