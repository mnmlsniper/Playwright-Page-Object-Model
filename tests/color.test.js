//5cb85c
import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/index';
import exp from 'constants';

const url = 'https://realworld.qa.guru/#/';

function convertHexToRGB (hex){
    hex = hex.replace(/^#/, '');
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    // Вернем объект, который содержит RGB цвета
    return {
        red: red,
        green: green,
        blue: blue,
    };
}

async function checkColor(el, cssProps, rgbColors){
    await expect(el).toHaveCSS(cssProps, `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`);
}

test.describe('CSS',() => {
    test.only('Проверить цвет логотипа', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.open(url);
        let hexColor = "#5cb85c";
        let rgbColors = convertHexToRGB(hexColor);
        const logo = await mainPage.logo;
        await checkColor(logo, 'color', rgbColors);
    });
});
