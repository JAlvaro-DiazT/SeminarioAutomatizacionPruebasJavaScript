const {Given, When, Then, Before, After} = require("@cucumber/cucumber");
const SignInPage = require("../../../test/pageobjects/signin.page");
const ConfigureSMSPage = require("../../../test/pageobjects/configuresms.page");
const {faker} = require("@faker-js/faker");
const assert = require("assert");
const Hook = require("../hook");


let signInPage;
let configureSMS;
let driver;

Before(async function () {
    driver = Hook.getDriver();
    signInPage = new SignInPage(driver);
    configureSMS = new ConfigureSMSPage(driver);
});
Given(/^The user is on the login page sms$/, async function () {
    //await configureSMS.visit('http://localhost:8080');

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
