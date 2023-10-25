const { When, Then, And, Given, Before, After, World} = require("@cucumber/cucumber");
const SignInPage = require("../../../test/pageobjects/signin.page");
const assert = require("assert");
const { Builder } = require("selenium-webdriver");
//const reporter = require('cucumber-html-reporter');
const fs = require('fs');

let signInPage;
let driver;

Before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    signInPage = new SignInPage(driver);
    await signInPage.init();
});

After(async function () {

    const screenshot = await driver.takeScreenshot();
    const timestamp = new Date().getTime();
    const screenshotPath = `./screenshots/screenshot_${timestamp}.png`;
    // Guardar la captura de pantalla en un archivo
    fs.writeFileSync(screenshotPath, screenshot, 'base64');

    // Adjuntar la captura de pantalla al informe HTML
    this.attach(screenshot, 'image/png', 'My screenshot step');

    await signInPage.driver.quit();
});

Given(/^The user is on the login page$/, async function () {
    await signInPage.visit('http://localhost:8080');
});

When(/^The user enters their username "([^"]*)" and password "([^"]*)"$/, async function (param1,param2) {
    const user = param1;
    const key = param2;
    await signInPage.signIn(user, key);
});

Then(/^The user should see the Logout button and Menu button$/, async function () {
    const isMenuVisible = await signInPage.isElementVisible(signInPage.registerMenu);
    const isGoOutVisible = await signInPage.isElementVisible(signInPage.registerGoOut);
    assert.strictEqual(isMenuVisible && isGoOutVisible, true);
});
Then(/^The user should see the fields sername and key$/, async function () {
    const isUserVisible = await signInPage.isElementVisible(signInPage.labelUser);
    const isKeyVisible = await signInPage.isElementVisible(signInPage.labelKey);

    assert.strictEqual(isUserVisible && isKeyVisible, true);
});
