
const supertest = require("supertest");

const { app, server } = require("../index");

const mongoose = require("mongoose")

const api = supertest(app);

const Perro = require("../modelo/perro")

beforeEach(async () => {
    await Perro.deleteMany({});

    const perro1 = new Perro({
        color: "blanco",
        raza: "cocker",
        nombre: "pepe"
    });
    await perro1.save();

    const perro2 = new Perro({
        color: "negro",
        raza: "labrador",
        nombre: "tiago"
    });
    await perro2.save();
})

describe("Pruebas de consultas", () => {
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

    test("Probamos que funcione la consulta unitaria", async () => {
        await api.get("/api/perros/1").expect(200);
    })

    test("Probamos que solo pueda mandar numeros en la consulta unitaria", async () => {
        await api.get("/api/perros/A").expect(400);
    })

})

describe("Pruebas de cambios", () => {
    test("Cargamos un perro y el mismo se carga", async () => {
        const response = await api.post("/api/perros").send({
            color: "verde",
            raza: "mestizo",
            nombre: "carlo"
        }).expect(201);
    })

    test("Controlamos que algun perro se llame carlo", async () => {
        const response = await api.post("/api/perros").send({
            color: "verde",
            raza: "mestizo",
            nombre: "carlo"
        }).expect(201);

        const perros = await api.get("/api/perros")

        const nombres = perros.body.map(perro => perro.nombre)

        expect(nombres).toContain("carlo")
    })

    test("Comprobamos los cambios, tiago ahora se llama Santiago", async () => {
        const response = await api.put("/api/perros/2").send({
            nombre: "Santiago"
        }).expect(200);

        const perros = await api.get("/api/perros/2");
        console.log(perros.body[0]);
        expect(perros.body[0].nombre).toBe("Santiago")
    })

    test("Probamos que solo pueda mandar numeros en UPDATE", async () => {
        await api.put("/api/perros/A").expect(400);
    })

    test("Probamos el borrado, el documento 1 deja de existir", async () => {
        await api.delete("/api/perros/1").expect(200);
        await api.get("/api/perros/1").expect(404);
    })

    test("Probamos que solo pueda mandar numeros en DELETE", async () => {
        await api.delete("/api/perros/A").expect(400);
    })

})

afterAll(() => {
    mongoose.connection.close();
    server.close()
});
