const assert = require('assert');

const { faker } = require('@faker-js/faker');
const RegisterPage = require("../pageobjects/register.page");

describe('Test de registrar usuario', function () {
    let registerPage;

    beforeEach(async function () {
        registerPage = new RegisterPage();
        await registerPage.init();
    });

    afterEach(async function () {
        await registerPage.driver.quit();
    });

    it('Debería registrarse correctamente', async function () {
        this.timeout(5000);
        await registerPage.visit('http://localhost:8080');

        const name = faker.person.fullName();
        const username = faker.internet.userName();
        const key = faker.internet.password();

        await registerPage.registerUser(name, username, key, key);

        const message = await registerPage.receivePopupMessage();
        assert.strictEqual(message, 'Operación completada');
    });

    it('Debe registrar un usuario que ya existe', async function () {
        this.timeout(5000);
        await registerPage.visit('http://localhost:8080');

        const name = "alvaro diaz";
        const username = "alvaro";
        const key = "diaz";

        // Llama a la función de registro de usuario (ajusta esto según tu estructura de código)
        await registerPage.registerUser(name, username, key, key);

        // Obtiene el mensaje de registro (ajusta esto según tu estructura de código)
        const message = await registerPage.receivePopupMessage();

        // Realiza la aserción (verifica que el mensaje sea igual a "Existing registration")
        assert.strictEqual(message, "Existing registration");
    });
});