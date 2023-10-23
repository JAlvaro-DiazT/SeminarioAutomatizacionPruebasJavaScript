const SignInPage = require('../pageobjects/signin.page');
const assert = require('assert');

describe('Test de inicio de sesión', function () {
    let signInPage;

    beforeEach(async function () {
        signInPage = new SignInPage();
        await signInPage.init();
    });

    afterEach(async function () {
        await signInPage.driver.quit();
    });

    it('Debería iniciar sesión correctamente', async function () {
        this.timeout(5000);
        await signInPage.visit('http://localhost:8080');
        const user = 'alvaro';
        const key = 'diaz';
        await signInPage.signIn(user, key);

        const isGoOutVisible = await signInPage.isElementVisible(signInPage.registerGoOut);
        const isMenuVisible = await signInPage.isElementVisible(signInPage.registerMenu);

        assert.strictEqual(isGoOutVisible && isMenuVisible, true);
    });

    it('Debería salir error al intentar iniciar sesión ', async function () {
        this.timeout(5000);
        await signInPage.visit('http://localhost:8080');
        const user = 'error prueba';
        const key = 'error123';
        await signInPage.signIn(user, key);

        const isUserVisible = await signInPage.isElementVisible(signInPage.labelUser);
        const isKeyVisible = await signInPage.isElementVisible(signInPage.labelKey);

        assert.strictEqual(isUserVisible && isKeyVisible, true);
    });
});
