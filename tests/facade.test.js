import { test, expect } from '@playwright/test';
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
        await app.registerPage.enterUsername(newUser.userName);
        await app.registerPage.enterEmail(newUser.userEmail);
        await app.registerPage.enterPassword(newUser.userPassword);
        await app.registerPage.clickSignup();
    });

    test('Пользователь может изменить bio. Page Object - junior version', async ({ page }) => {
        await app.mainPage.goToSettings();
        await app.settingsPage.enterUserBio(newUser.userBio);
        await app.settingsPage.updateProfileSimple();
        await expect(app.settingsPage.bioField).toContainText(newUser.userBio);
    });
});
