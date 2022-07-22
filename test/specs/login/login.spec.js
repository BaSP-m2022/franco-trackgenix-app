const HomePage = require('../../pageobjects/home.page');
const LoginPage = require('../../pageobjects/login/login.page');

beforeAll('Open Browser', () => {
  HomePage.open();
});

describe('E2e test login successfully', () => {
  it('On home page, click on login button', async () => {
    await expect(HomePage.loginButton).toBeClickable();
    await HomePage.loginButton.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/login');
  });
  it('Complete fields whit valid data en login successfull', async () => {
    await expect(LoginPage.emailInput).toBeDisplayed();
    await expect(LoginPage.passwordInput).toBeDisplayed();
    await LoginPage.login('wdiotest@gmail.com', 'test1234');
  });
  it('If we login, we should be redirected to home', async () => {
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees/home');
    const hiButton = await $('//*[@id="root"]/div/header/div[2]/button[1]');
    const hiMsg = await hiButton.getText();
    await expect(hiMsg).toBe('Hi, Wdio');
  });
});
