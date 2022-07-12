const LoginPage = require('../../pageobjects/login/login.page');

beforeAll('Go to the login page', () => {
  browser.url('https://franco-trackgenix-app.vercel.app/login');
});
beforeEach('refresh', () => {
  browser.url('https://franco-trackgenix-app.vercel.app/login');
});

describe('E2e test login fail', () => {
  it('can not login whit wrong data', async () => {
    await expect(LoginPage.emailInput).toBeDisplayed();
    await expect(LoginPage.passwordInput).toBeDisplayed();
    await LoginPage.login('wrongemail@gmail.com', 'falsepass1');
    await expect(LoginPage.modalError).toBeDisplayed();
    await expect(LoginPage.errorMsg).toBeDisplayed();
    await expect(LoginPage.errorMsg).toHaveText('Login error');
    await expect(LoginPage.okErrorButton).toBeDisplayed();
    await LoginPage.okErrorButton.click();
  });
  it('Check frontend validations', async () => {
    await LoginPage.loginButton.click();
    await expect(LoginPage.inputError1).toBeDisplayed();
    await expect(LoginPage.inputError1).toHaveText('"email" is not allowed to be empty');
    await expect(LoginPage.inputError2).toBeDisplayed();
    await expect(LoginPage.inputError2).toHaveText('"password" is not allowed to be empty');
    await LoginPage.emailInput.setValue('a');
    await expect(LoginPage.inputError3).toHaveText('The email is invalid');
  });
});
