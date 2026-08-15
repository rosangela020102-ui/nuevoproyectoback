import request from "supertest";
import app from "./src/app.js";

describe("🧪 Pruebas de los Endpoints de la API", () => {
  it("Debería devolver que la API está funcionando en la ruta raíz", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
  });
});