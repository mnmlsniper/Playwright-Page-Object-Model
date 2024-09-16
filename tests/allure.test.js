import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";
import { UserBuilder } from '../src/helpers/index';
import { App } from '../src/pages/index';

//todo Вынести url в конфиг плейрайта или окружения
const url = 'https://realworld.qa.guru/#/';
let newUser;
let app;

test.describe('Builder',() => {
    test.beforeEach( async ({ page }) => {
        newUser = new UserBuilder().addBio().addEmail().addName().addPassword().generate();
        app = new App(page);
        await app.mainPage.open(url);
        await app.mainPage.goToRegister();
        await allure.step("Ввести имя пользователя", async () => {
        await app.registerPage.enterUsername(newUser.userName);
        });
        await app.registerPage.enterEmail(newUser.userEmail);
        await app.registerPage.enterPassword(newUser.userPassword);
        await app.registerPage.clickSignup();
    });

    test('Пользователь может изменить bio. Page Object - junior version', async ({ page }) => {
        await allure.owner("Lyubo Danilova");
        await allure.tags("smoke", "UI", "regress", "profile");
      //  await allure.severity(Severity.CRITICAL);
        await allure.link("https://example.com/docs", "Related Documentation");
        await allure.issue("AUTH-123", "https://example.com/issues/AUTH-123");
        await allure.tms("TMS-456", "https://example.com/tms/TMS-456");
        await allure.parentSuite("Web interface");
        await allure.suite("Essential features");

        await allure.subSuite("Authentication");
        await allure.epic("Web interface");
        await allure.feature("Essential features");
        await allure.story("Authentication");
        
        await app.mainPage.goToSettings();
        await app.settingsPage.enterUserBio(newUser.userBio);
        await app.settingsPage.updateProfileSimple();
        await expect(app.settingsPage.bioField).toContainText(newUser.userPassword);
    });
});
