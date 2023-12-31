const { Builder, By, Key, until } = require('selenium-webdriver');

class Base {
    constructor(driver) {
        this.driver = driver;
        this.ewait = null;
        this.goForward = By.xpath("//span[@class='ui-button-icon-left ui-icon ui-c pi pi-arrow-circle-right']");
        this.goBack = By.xpath("//span[@class='ui-button-icon-left ui-icon ui-c pi pi-arrow-circle-left']");
        this.numberOneLocater = By.xpath("//span[@class='ui-steps-number' and text()='1']");
        this.titleOneLocater = By.xpath("//span[@class='ui-steps-title' and text()='Configurar SMS']");
    }

    async init() {
        //this.driver = await new Builder().forBrowser('chrome').build();
        this.ewait = (condition) => {
            return this.driver.wait(condition);
        };
    }

    async finElement(locator) {
        return this.driver.findElement(locator);
    }

    async findElements(locator) {
        return this.driver.findElements(locator);
    }

    async getText(element) {
        return element.getText();
    }

    async getText(locator) {

        await this.ewait(until.elementLocated(locator));
        const element = await this.finElement(locator);
        return element.getText();
    }

    async type(inputText, locator) {
        const element = await this.finElement(locator);
        await element.clear();
        await element.sendKeys(inputText);
    }

    async click(locator) {
        //await this.ewait(until.elementIsVisible(this.finElement(locator)), 5000, 'Elemento no es visible.');
        const element = await this.finElement(locator);
        await element.click();
    }

    async isElementVisible(locator, timeout = 5000) {
        try {
            await this.ewait(until.elementLocated(locator), timeout);
            const element = await this.finElement(locator);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }
    async visit(url) {
        await this.driver.get(url);
    }

    async goForward() {
        await this.click(this.goForward);
    }

    async goBack() {
        await this.click(this.goBack);
    }

    async goFirstPage() {
        this.isElementVisible(this.numberOneLocater)
        await this.click(this.numberOneLocater);
        // await this.click(this.titleOneLocater); // Esta línea es opcional
    }

    async redirectPage(page) {
        await this.goFirstPage();
        for (let i = 1; i < page; i++) {
            await this.goForward();
        }
    }
}
module.exports = Base;
/*
const base = new Base();

// Ejemplo de uso:
(async () => {
    await base.init();
    await base.visit('http://localhost:8080');
    //console.log(await base.getText(base.numberOneLocater));
    await base.driver.quit();
})();
*/