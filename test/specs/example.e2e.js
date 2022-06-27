const LoginPage = require('../pageobjects/login.page');

describe('My Login application', () => {
  it('should login with valid credentials', async () => {
    await LoginPage.open();

    await LoginPage.login('tomsmith', 'SuperSecretPassword!');
  });
});
