
const supertest = require("supertest");

const { app, server } = require("../index");

const mongoose = require("mongoose")

const api = supertest(app);

const Perro = require("../modelo/perro")

beforeEach(async () => {
    await Perro.deleteMany({});

    const perro1 = new Perro({
        id: 1,
        color: "blanco",
        raza: "cocker",
        nombre: "pepe"
    });
    await perro1.save();
})




test("Los perros vienen en formato JSON", async () => {
    await api
        .get("/api/perros")
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

afterAll(() => {
    mongoose.connection.close();
    server.close()
});

