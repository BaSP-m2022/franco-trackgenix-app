const Homepage = require('../../pageobjects/home.page');
const SuperAdminList = require('../../pageobjects/superadmin.list');

describe('Super Admin list interactions', () => {
  beforeAll('Homepage should be deployed', async () => {
    browser.fullscreenWindow();
    await Homepage.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Login success', async () => {
    browser.fullscreenWindow();
    await SuperAdminList.loginSA('noborrar@hotmail.com', '1234567q');
  });
  it('Super Admin main page should be deployed', async () => {
    browser.fullscreenWindow();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins');
    await expect(SuperAdminList.searchInput).toBeDisplayed();
    await SuperAdminList.setSearchFirstName('Higinia');
    await SuperAdminList.crossSearch.click();
    await expect(SuperAdminList.superAdminTitle).toBeDisplayed();
    await expect(SuperAdminList.superAdminTitle).toHaveText('Admins');
    await expect(SuperAdminList.table).toBeDisplayed();
    await expect(SuperAdminList.tableHead).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1FirstName).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1LastName).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1Email).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1Id).toBeDisplayed();
  });
  it('Buttons clickables', async () => {
    browser.fullscreenWindow();
    await expect(SuperAdminList.superAdmin1EditButton).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1EditButton).toBeClickable;
    await expect(SuperAdminList.superAdmin1DeleteButton).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1DeleteButton).toBeClickable;
    await expect(SuperAdminList.addSuperAdmin).toBeDisplayed();
    await expect(SuperAdminList.addSuperAdmin).toBeClickable;
  });
  it('Delete an Super Admin', async () => {
    browser.fullscreenWindow();
    await SuperAdminList.deleteSuperAdmin();
  });
});
