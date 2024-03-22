const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000/';
const allBoosLinkSelector = 'a[href="/catalog"]';
const loginButtonSelector = 'a[href="/login"]';
const registerButtonSelector = 'a[href="/register"]';
const emailInputSelector = 'input[name="email"]';
const passwordInputSelector = 'input[name="password"]';
const submitButtonSelector = 'input[type="submit"]';


test('Verify "All books" is visible', async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    const allBoosLink = await page.$(allBoosLinkSelector);
    const isLinkVisible = await allBoosLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.$(loginButtonSelector);
    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
});

test('Verify "Register" button is visible', async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    const registerButton = await page.$(registerButtonSelector);
    const isRegisterButtonVisible = await registerButton.isVisible();

    expect(isRegisterButtonVisible).toBe(true);
});

test('Verify "All books" is visible after user login', async ({ page }) => {
    await page.goto(baseUrl + 'login');
    await page.fill(emailInputSelector, 'peter@abv.bg');
    await page.fill(passwordInputSelector, '123456');
    await page.click(submitButtonSelector);

    const allBoosLink = await page.$(allBoosLinkSelector);
    const isAllBooksLinkVisible = await allBoosLink.isVisible();

    expect(isAllBooksLinkVisible).toBe(true);
});