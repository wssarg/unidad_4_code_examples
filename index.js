
require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const app = express();

const connectionString = process.env.NODE_ENV === "production" ? process.env.DB_PATH_PROD : process.env.DB_PATH;

mongoose.connect(connectionString);

const Perro = require("./modelo/perro");

//Middleware
app.use(express.json())

//Middleware: establece que el contenido de las peticiones viajara en formato JSON
app.use((req, res, next) => {
    res.header("Content-type", "application/json; charset=utf8");
    next();
})


// definir el ENDPOINT get
app.get("/api/perros", async (req, res) => {
    const perro = await Perro.find();

    res.status(200).send(JSON.stringify(perro));
});

// definir el ENDPOINT get
app.post("/api/perros", async (req, res) => {

    const perros = Perro.find();

    const id_perro = (await perros).length + 1;

    //console.log(id_perro);

    const datos_perro = {
        id: id_perro, ...req.body
    }

    //console.log(datos_perro);

    const perro1 = new Perro(datos_perro);
    await perro1.save()

    res.status(201).send(JSON.stringify(perro1));
    //res.status(201).send(JSON.stringify({ id: id_perro }));
});


const PORT = process.env.PORT || 3030;
const server = app.listen(PORT, () => {
    console.log(`Servidor APP corriendo en puerto ${PORT}`)
})


module.export = { app, server };