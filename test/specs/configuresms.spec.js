const ConfigureSMSPage = require('../pageobjects/configuresms.page');
const SignInPage = require('../pageobjects/signin.page');
const assert = require('assert');
const { faker } = require('@faker-js/faker');
const { Builder } = require('selenium-webdriver');
describe('Test de la primera pagina Configure SMS', function () {
    let signInPage;
    let configureSMS;

    beforeEach(async function () {
        const driver = await new Builder().forBrowser('chrome').build();
        signInPage = new SignInPage(driver);
        configureSMS = new ConfigureSMSPage(driver);

        await configureSMS.init();
    });

    afterEach(async function () {
        await configureSMS.driver.quit();
    });

    it('Debería registrar el nombre y descripcion del proyecto', async function () {

        this.timeout(7000);
        await configureSMS.visit('http://localhost:8080');

        const user = 'alvaro';
        const key = 'diaz';
        await signInPage.signIn(user, key);

        await configureSMS.goFirstPage();

        const name = faker.lorem.words(10);
        const description = faker.lorem.paragraph(20);
        await configureSMS.registerConfigureSMS(name,description);

        const isTableVisible = await configureSMS.isElementVisible(configureSMS.tableBody);

        assert.strictEqual(isTableVisible, true);
    });
});