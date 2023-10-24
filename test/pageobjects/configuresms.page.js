const { By, until } = require('selenium-webdriver');
const Base = require('./Base');

class ConfigureSMSPage extends Base {
    constructor(driver) {
        super(driver);

        this.configureSMSLocator = By.xpath("//span[@class='ui-steps-number' and text()='1']");
        this.configureNameProjectLocator = By.id("registro:nombre");
        this.configureDescriptionLocator = By.id("registro:descripcion");

        this.configureSMSButtonLocator = By.xpath("//span[@class='ui-button-text ui-c' and text()='Aceptar']");

        this.titleApp = By.id("tituloApp");
        this.tableBody = By.id("tabla:j_idt89_data");
    }

    async registerConfigureSMS(nameProject, descriptionProject) {
        await this.click(this.configureSMSLocator);
        await this.type(nameProject, this.configureNameProjectLocator);
        await this.type(descriptionProject, this.configureDescriptionLocator);
        await this.click(this.configureSMSButtonLocator);
    }

    async getTitle() {
        return this.titleApp;
    }


}

module.exports = ConfigureSMSPage; // Exporta la clase para poder importarla en otros archivos


//const configureSMS = new ConfigureSMSPage();

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