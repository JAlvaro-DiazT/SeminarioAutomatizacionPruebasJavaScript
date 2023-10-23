const { By, until } = require('selenium-webdriver');
const Base = require('./Base'); // Asegúrate de importar la clase Base desde el archivo correspondiente

class RegisterPage extends Base {
    constructor(driver) {
        super(driver);
        this.registerButtonLocator = By.id("j_idt76");
        this.registerNameLocator =  By.id("registro:nombre");
        this.registerUserNameLocator = By.id("registro:nombreUsuario");
        this.registerKeyLocator = By.id("registro:clave");
        this.registerRepeatKeyLocator = By.id("registro:verificacionClave");
        this.registerButtonAcceptLocator = By.id("registro:j_idt88");
        this.messageRegister = By.xpath("//div[@class='ui-growl-message']/span[@class='ui-growl-title']");

    }

    async registerUser(name, username,key,keyVerification) {
        await this.click(this.registerButtonLocator);
        await this.type(name, this.registerNameLocator);
        await this.type(username, this.registerUserNameLocator);
        await this.type(key, this.registerKeyLocator);
        await this.type(keyVerification, this.registerRepeatKeyLocator);
        await this.click(this.registerButtonAcceptLocator);
    }

    async receivePopupMessage() {
        return this.getText(this.messageRegister)
    }
}

module.exports = RegisterPage; // Exporta la clase para poder importarla en otros archivos


//const registerPage = new RegisterPage();