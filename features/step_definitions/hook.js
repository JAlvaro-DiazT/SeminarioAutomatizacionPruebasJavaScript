
const { Builder} = require('selenium-webdriver');
const {Before, After, BeforeStep} = require("@cucumber/cucumber");

let driver;

Before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    //await driver.manage().setTimeouts({ implicit: 5000 });
    await driver.get('http://localhost:8080');
    await driver.manage().window().maximize();
});

After(async function () {

    await driver.quit();
});

BeforeStep(async function (){
    const screenshot = await driver.takeScreenshot()
    this.attach((screenshot), {
        mediaType: 'base64:image/png'
    })
});

module.exports = {
    getDriver: () => driver,
};
