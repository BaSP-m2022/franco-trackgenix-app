const LoginPage = require('../../../pageobjects/login/login.page');

beforeAll('Login whit admin', () => {
  LoginPage.open();
  LoginPage.login('admin@gmail.com', 'admin123');
});

describe('employee e2e test', () => {
  it('Check correct path', async () => {
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees');
  });
  it('Edit an Employee', async () => {
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees');
  });
});
