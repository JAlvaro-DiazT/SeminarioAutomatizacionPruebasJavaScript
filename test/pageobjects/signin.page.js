const { By, until } = require('selenium-webdriver');
const Base = require('./Base');

class SignInPage extends Base {
    constructor(driver) {
        super(driver);

        this.enterUserNameLocator = By.id("nombreUsuario");
        this.enterKeyLocator = By.id("clave");
        this.registerEnterLocator = By.xpath("//span[@class='ui-button-text ui-c']");
        this.registerGoOut = By.xpath("//span[@class='ui-button-text ui-c' and text()='Salir']");
        this.registerMenu = By.xpath("//span[@class='ui-button-icon-left ui-icon ui-c pi pi-bars']");
        this.labelUser = By.xpath("//span[@class='ui-outputlabel-label' and text()='Nombre de Usuario: ']");
        this.labelKey = By.xpath("//span[@class='ui-outputlabel-label' and text()='Clave: ']");
    }

    async signIn(user, key) {
        await this.type(user, this.enterUserNameLocator);
        await this.type(key, this.enterKeyLocator);
        await this.click(this.registerEnterLocator);
    }

    async getTitle() {
        return this.driver.getTitle();
    }
}

module.exports = SignInPage; // Exporta la clase para poder importarla en otros archivos


//const signInPage = new SignInPage();

// Ejemplo de uso:
/*
(async () => {
    await signInPage.init();
    await signInPage.visit('http://localhost:8080');
    await signInPage.signIn('alvaro', 'diaz');

    if (await signInPage.isElementVisible(signInPage.registerGoOut)) {
        console.log('registerGoOut is visible');
    } else {
        console.log('registerGoOut is not visible');
    }

    if (await signInPage.isElementVisible(signInPage.registerMenu)) {
        console.log('registerMenu is visible');
    } else {
        console.log('registerMenu is not visible');
    }

    await signInPage.click(signInPage.registerMenu);

    await signInPage.driver.manage().setTimeouts({ implicit: 5000 });

    await signInPage.driver.quit();
})();

*/