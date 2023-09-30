
const supertest = require("supertest");

const { app, server } = require("../index.js");


const api = supertest(app);


test("Los perros vienen en formato JSON", async () => {
    await api
        .get("/api/perros")
        .expect(200)
        .expect("Content-Type", /application \/json/);
});

