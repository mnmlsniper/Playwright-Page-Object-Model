import { test, expect } from '@playwright/test';

const url = 'https://realworld.qa.guru/#/';

test.describe.only('Visual', () => {
  test('Basic screenshot page', async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveScreenshot();
  });
  test('Basic full screenshot page', async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  test('Basic crop screenshot page', async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveScreenshot({
      clip: {
        x: 0,
        y: 0,
        width: 500,
        height: 500
      }
    });
  });
  test('Basic screenshot element', async ({ page }) => {
    await page.goto(url);
    const $logo = page.locator('.navbar');
    await expect($logo).toHaveScreenshot();
  });
  test('Basic screenshot element with', async ({ page }) => {
    await page.goto(url);
    await page.getByRole('link', { name: 'Sign up' }).click();
    const $emailInput = page.getByPlaceholder('Email');
    $emailInput.focus();
    await expect($emailInput).toHaveScreenshot();
    $emailInput.fill('Hey, I!!');
    await expect($emailInput).toHaveScreenshot();
  });
  test('Basic screenshot page with mask', async ({ page }) => {
    await page.goto(url);
    const $logo = page.locator('.navbar');

    await expect(page).toHaveScreenshot({
      mask: [$logo]
    });
  });
  test('Basic screenshot page with mock', async ({ page }) => {
    await page.route('**/tags', async (route) => {
      const json = { tags: ['понедельник', 'пятничка'] };
      await route.fulfill({ json });
    });
    await page.goto(url);
    await expect(page).toHaveScreenshot();
  });
  test('Basic screenshot page with one mock', async ({ page }) => {
    await page.route('**/tags', async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      json.tags.unshift('пятничка');
      await route.fulfill({ json });
    });
    await page.goto(url);
    await expect(page).toHaveScreenshot();
  });
});
