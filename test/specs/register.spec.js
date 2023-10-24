const assert = require('assert');

const { faker } = require('@faker-js/faker');
const RegisterPage = require("../pageobjects/register.page");
const {Builder} = require("selenium-webdriver");
const SignInPage = require("../pageobjects/signin.page");

describe('Test de registrar usuario', function () {
    let registerPage;

    beforeEach(async function () {

        const driver = await new Builder().forBrowser('chrome').build();
        registerPage = new RegisterPage(driver);
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

        await registerPage.registerUser(name, username, key, key);
        const message = await registerPage.receivePopupMessage();
        assert.strictEqual(message, "Existing registration");
    });
});