
const supertest = require("supertest");

const { app, server } = require("../index");

const mongoose = require("mongoose")

const api = supertest(app);


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

