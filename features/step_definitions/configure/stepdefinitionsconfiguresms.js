const {Given, When, Then, Before, After} = require("@cucumber/cucumber");
const {Builder} = require("selenium-webdriver");
const SignInPage = require("../../../test/pageobjects/signin.page");
const ConfigureSMSPage = require("../../../test/pageobjects/configuresms.page");
const {faker} = require("@faker-js/faker");
const assert = require("assert");
const fs = require("fs");


let signInPage;
let configureSMS;
let driver;

Before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    signInPage = new SignInPage(driver);
    configureSMS = new ConfigureSMSPage(driver);
    await configureSMS.init();
});

After(async function () {
    const screenshot = await driver.takeScreenshot();
    const timestamp = new Date().getTime();
    const screenshotPath = `./screenshots/screenshot_${timestamp}.png`;
    // Guardar la captura de pantalla en un archivo
    fs.writeFileSync(screenshotPath, screenshot, 'base64');

    // Adjuntar la captura de pantalla al informe HTML
    this.attach(screenshot, 'image/png', 'My screenshot step');
    await configureSMS.driver.quit();
});
Given(/^The user is on the login page sms$/, async function () {
    await configureSMS.visit('http://localhost:8080');
});
Given(/^The user enters their username "([^"]*)" and password "([^"]*)" sms$/, async function (param1,param2) {
    const user = param1;
    const key = param2;
    await signInPage.signIn(user, key);
});
Given(/^The user is redirected to page (\d+)$/, async function (param) {
    await configureSMS.goFirstPage();
});
When(/^The user enters the name and description$/, async function () {
    const name = faker.lorem.words(10);
    const description = faker.lorem.paragraph(20);
    await configureSMS.registerConfigureSMS(name,description);
});
Then(/^the user should be on the next page seeing the goal table$/, async function () {
    const isTableVisible = await configureSMS.isElementVisible(configureSMS.tableBody);

    assert.strictEqual(isTableVisible, true);
});
