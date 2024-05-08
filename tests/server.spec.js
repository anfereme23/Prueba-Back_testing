const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("GET /cafes  devuelve status 200 y valida que el tipo de dato recibido sea un arreglo con min 1 objeto", async () => {
        const response = await request(server).get("/cafes")
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)
    })

    it("POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
        const newCafe={
            "id": 5,
            "nombre": "Americano2"
        }
        const response = await request(server).post("/cafes").send(newCafe)
        expect(response.statusCode).toBe(201)
        expect(response.body).toContainEqual(newCafe)
    })

    it("PUT /cafes devuelve status 400 si intentas actualizar un café enviando un id en los parámetros diferente al id dentro del payload", async () => {
        const newCafe={
            "id": 5,
            "nombre": "Americano2"
        }
        const response = await request(server).put("/cafes/6").send(newCafe)
        expect(response.statusCode).toBe(400)
    })

    it("DELETE /cafes Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.", async () => {
        const jwt ="token"
        const response = await request(server).delete("/cafes/6").set('Authorization', jwt)
        expect(response.statusCode).toBe(404)
    })
});



