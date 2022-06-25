const Homepage = require('../pageobjects/home.page');
const AdminPage = require('../pageobjects/admins/admin.page');
// const AdminForm = require('../pageobjects/admins/admin.page');

describe('Home page interactions', () => {
  it('Homepage should be deployed', async () => {
    await Homepage.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Admin main page and form should be deployed', async () => {
    await AdminPage.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins');
    await expect(AdminPage.addAdmin).toBeDisplayed();
    await expect(AdminPage.addAdmin).toBeClickable;
    await AdminPage.addAdmin.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins/form');
  });
});
