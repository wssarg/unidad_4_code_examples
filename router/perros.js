require("dotenv").config();
const express = require("express");
const router = express.Router();

const mongoose = require("../connection_db");
const Perro = require("../modelo/perro");

//Middleware: establece que el contenido de las peticiones viajara en formato JSON
router.use((req, res, next) => {
    res.header("Content-type", "application/json; charset=utf8");
    next();
})


// definir el ENDPOINT get
router.get("/", async (req, res) => {
    const perro = await Perro.find();

    res.status(200).send(JSON.stringify(perro));
});

// definir el ENDPOINT get con parametros
router.get("/:id_perro", async (req, res) => {

    if (Number.isNaN(Number(req.params.id_perro))) {
        res.status(400)
            .send(JSON.stringify({ message: 'The value should be numeric', id_perro: req.params.id_perro }));
        return
    }

    const perro = await Perro.find({ id_perro: req.params.id_perro });

    if (perro[0]) {
        res.status(200).send(JSON.stringify(perro));
        return
    }
    res.status(404).send(JSON.stringify({ message: 'Not Found', id_perro: req.params.id_perro }));
});

// defino POST
router.post("/", async (req, res) => {
    const perro = await new Perro(req.body);
    //console.log(perro);
    await perro.save();

    res.status(201).send(JSON.stringify(perro));
});

// cambios a perros
router.put("/:id_perro", async (req, res) => {

    if (Number.isNaN(Number(req.params.id_perro))) {
        res.status(400)
            .send(JSON.stringify({ message: 'The value should be numeric', id_perro: req.params.id_perro }));
        return
    }

    await Perro.updateOne({ id_perro: req.params.id_perro }, req.body)

    const perro = await Perro.find({ id_perro: req.params.id_perro });

    if (perro[0]) {
        res.status(200).send(JSON.stringify(perro[0]));
        return
    }
    res.status(404).send(JSON.stringify({ message: 'Not Found', id_perro: req.params.id_perro }));
});

// borramos perros
router.delete("/:id_perro", async (req, res) => {

    if (Number.isNaN(Number(req.params.id_perro))) {
        res.status(400)
            .send(JSON.stringify({ message: 'The value should be numeric', id_perro: req.params.id_perro }));
        return
    }

    // buscamos si existe el perro
    const perro = await Perro.find({ id_perro: req.params.id_perro });

    if (perro[0]) {
        await Perro.deleteOne({ id_perro: req.params.id_perro })
        // devolvemos el perro que se borro
        res.status(200).send(JSON.stringify({ message: 'El perro se borro correctamente', payload: perro[0] }));
        return
    }
    res.status(404).send(JSON.stringify({ message: 'Not Found', id_perro: req.params.id_perro }));
});

module.exports = router;
