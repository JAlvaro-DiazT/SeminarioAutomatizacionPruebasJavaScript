const { When, Then, And, Given, Before, After} = require("@cucumber/cucumber");
const assert = require("assert");
const { Builder } = require("selenium-webdriver");
const { faker } = require('@faker-js/faker');
const RegisterPage = require("../../../test/pageobjects/register.page");
const _ = require('lodash');
const fs = require("fs");
const Hook = require("../hook");
const SignInPage = require("../../../test/pageobjects/signin.page");
const ConfigureSMSPage = require("../../../test/pageobjects/configuresms.page");


let registerPage;
let driver;
Before(async function () {
    driver = Hook.getDriver();
    registerPage = new RegisterPage(driver);

});
Given(/^The user is on the registration page$/, async function () {
    //await registerPage.visit('http://localhost:8080');

});
When(/^The user enters his full name "([^"]*)", username "([^"]*)" and password "([^"]*)"$/, async function (name, username, password) {


    if (_.isEmpty(name) && _.isEmpty(username) && _.isEmpty(password)) {
        name = faker.person.fullName();
        username = faker.internet.userName();
        password = faker.internet.password();
    }

    await registerPage.registerUser(name, username, password, password);
});
Then(/^The user should then see the message "([^"]*)"$/, async function (message_expected) {
    const message = await registerPage.receivePopupMessage();
    assert.strictEqual(message, message_expected);
});