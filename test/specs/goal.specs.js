const GoalPage = require('../pageobjects/goal.page');
const SignInPage = require('../pageobjects/signin.page');
const assert = require('assert');
const { faker } = require('@faker-js/faker');
const { Builder } = require('selenium-webdriver');
describe('Test de la segunda pagina Objetivo SMS', function () {
    let signInPage;
    let goalPage;

    beforeEach(async function () {
        const driver = await new Builder().forBrowser('chrome').build();
        signInPage = new SignInPage(driver);
        goalPage = new GoalPage(driver);

        await goalPage.init();
    });

    afterEach(async function () {
        await goalPage.driver.quit();
    });

    it('Debería registrar el codigo y descripcion de un objetivo, mostrando un mesaje de operacion completada', async function () {

        this.timeout(7000);
        await goalPage.visit('http://localhost:8080');

        const user = 'alvaro';
        const key = 'diaz';
        await signInPage.signIn(user, key);

        await goalPage.goFirstPage();
        await goalPage.redirectPage(2);

        const code = faker.lorem.words(10);
        const description = faker.lorem.paragraph(20);
        await goalPage.registerGoal(code,description);

        //assert(await goalPage.validateGoalSearch(code));
        //const isTableVisible = await goalPage.isElementVisible(goalPage.tableBody);

        const message = await goalPage.receivePopupMessage();
        assert.strictEqual(message, 'Operación completada');
    });
});