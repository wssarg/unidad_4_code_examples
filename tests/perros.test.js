
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

    const perro2 = new Perro({
        id: 2,
        color: "negro",
        raza: "labrador",
        nombre: "tiago"
    });
    await perro2.save();
})




test("Los perros vienen en formato JSON", async () => {
    await api
        .get("/api/perros")
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Los perros deberian ser 2", async () => {
    const response = await api.get("/api/perros")
    expect(response.body).toHaveLength(2)
})

test("El primer perro deberia ser blanco", async () => {
    const response = await api.get("/api/perros")
    expect(response.body[0].color).toBe("blanco")
})

test("Algun registro deberia ser labrador", async () => {
    const response = await api.get("/api/perros")

    const razas = response.body.map(perro => perro.raza)

    expect(razas).toContain("labrador")
})

test("Cargamos un perro y el mismo se carga", async () => {
    const response = await api.post("/api/perros").send({
        color: "verde",
        raza: "mestizo",
        nombre: "carlo"
    }).expect(201);
})


afterAll(() => {
    mongoose.connection.close();
    server.close()
});

