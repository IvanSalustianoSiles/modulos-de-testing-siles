import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");
const testUser = { first_name: "Jerry", last_name: "Smith", password: "Coki2011", email: "jerrysmith@gmail.com" };

describe("Test Integración Users", function() {
    before(function() {});
    beforeEach(function() {});
    after(function() {});
    afterEach(function() {});
    it("POST api/auth/register | Debe registrar un nuevo usuario y redireccionar a products", async function() {
        const { statusCode, _body } = await requester.post("/api/auth/register").send(testUser)
        .expect("Location", "/products");
        expect(_body).to.be.undefined;
        expect(statusCode).to.be.equals(302);
    });
    it("POST api/auth/register | No debe registrar un usuario con el mismo mail", async function() {
        const { statusCode, _body } = await requester.post("/api/auth/register").send(testUser);
        expect(_body.error).to.be.ok;
        expect(statusCode).to.be.equals(403);
    });
    it("POST api/auth/login | Debe loguear un usuario correctamente y redireccionar a products", async function() {
        const { statusCode, _body } = await requester.post("/api/auth/login").send(testUser)
        .expect("Location", "/products");
        expect(_body).to.be.undefined;
        expect(statusCode).to.be.equals(302);
    });
    it("POST api/auth/login | No debe loguear un usurio que no ingrese todos los campos", async function() {
        const { statusCode, _body } = await requester.post("/api/auth/login").send({ email: "fake@gmail.com" });
        expect(_body.error).to.be.ok;
        expect(statusCode).to.be.equals(400);
    });
    it("POST api/auth/login | No debe loguear un usuario que ingrese datos inválidos", async function() {
        const { statusCode, _body } = await requester.post("/api/auth/login").send({ email: "noestoyenlaDB@gmail.com", password: "contraseña(muyoriginal)" });
        expect(_body.error).to.be.ok;
        expect(statusCode).to.be.equals(403);
    });

});