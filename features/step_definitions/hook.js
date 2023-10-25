
const { Builder} = require('selenium-webdriver');
const {Before, After} = require("@cucumber/cucumber");

let driver;

Before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ implicit: 5000 });
    await driver.get('http://localhost:8080');
    await driver.manage().window().maximize();
});

After(async function () {
    await driver.quit();
});

module.exports = {
    getDriver: () => driver,
};
