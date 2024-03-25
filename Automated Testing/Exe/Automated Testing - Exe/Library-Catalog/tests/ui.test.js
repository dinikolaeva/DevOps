const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000/';

const user = 'peter@abv.bg';
const password = '123456';

const allBoosLinkSelector = 'a[href="/catalog"]';
const myBooksLinkSelector = 'a[href="/profile"]';
const addBookLinkSelector = 'a[href="/create"]';

const loginButtonSelector = 'a[href="/login"]';
const logoutButtonSelector = '#logoutBtn';
const registerButtonSelector = 'a[href="/register"]';
const submitButtonSelector = 'input[type="submit"]';

const emailInputSelector = 'input[name="email"]';
const passwordInputSelector = 'input[name="password"]';


// Verifying links
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
    await page.fill(emailInputSelector, user);
    await page.fill(passwordInputSelector, password);
    await page.click(submitButtonSelector);

    const allBooksLink = await page.$(allBoosLinkSelector);
    const isAllBooksLinkVisible = await allBooksLink.isVisible();

    expect(isAllBooksLinkVisible).toBe(true);
});

test('Verify "My Books" link is visible after user login', async ({ page }) => {
    await page.goto(baseUrl + 'login');
    await page.fill(emailInputSelector, user);
    await page.fill(passwordInputSelector, password);
    await page.click(submitButtonSelector);

    const myBooksLink = await page.$(myBooksLinkSelector);
    const isMyBooksIsVisible = await myBooksLink.isVisible();

    expect(isMyBooksIsVisible).toBe(true);
});

test('Verify "Add Book" link and "Logout button" is visible after user login', async ({ page }) => {
    await page.goto(baseUrl + 'login');
    await page.fill(emailInputSelector, user);
    await page.fill(passwordInputSelector, password);
    await page.click(submitButtonSelector);

    // check button
    const logoutButton = await page.$(logoutButtonSelector);
    const isLogoutButtonVisible = await logoutButton.isVisible();
    expect(isLogoutButtonVisible).toBe(true);

    // check link
    const addBookLink = await page.$(addBookLinkSelector);
    const isAddBookIsVisible = await addBookLink.isVisible();

    expect(isAddBookIsVisible).toBe(true);
});

// Verifying Login page
test('Login with valid credentials', async ({ page }) => {
    await page.goto(baseUrl + 'login');
    await page.fill(emailInputSelector, user);
    await page.fill(passwordInputSelector, password);
    await page.click(submitButtonSelector);

    await page.$(allBoosLinkSelector);

    expect(page.url()).toBe(baseUrl + 'catalog');
});

test('Submit the form with empty input fields', async ({ page }) => {
    await page.goto(baseUrl + 'login');
    await page.click(submitButtonSelector);

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$(loginButtonSelector);

    expect(page.url()).toBe(baseUrl + 'login');
});

test('Submit the form with empty email input field', async ({ page }) => {
    await page.goto(baseUrl + 'login');
    await page.fill(passwordInputSelector, password);
    await page.click(submitButtonSelector);

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$(loginButtonSelector);

    expect(page.url()).toBe(baseUrl + 'login');
});

test('Submit the form with empty password input field', async ({ page }) => {
    await page.goto(baseUrl + 'login');
    await page.fill(emailInputSelector, user);
    await page.click(submitButtonSelector);

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$(loginButtonSelector);

    expect(page.url()).toBe(baseUrl + 'login');
});