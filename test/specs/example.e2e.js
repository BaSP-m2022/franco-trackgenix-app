const LoginPage = require('../pageobjects/home.page.');

describe('Home page interactions', () => {
    it('Homepage should be deployed', async () => {
        await LoginPage.open();
        await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/home')
    });
});


