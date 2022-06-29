const Homepage = require('../../pageobjects/home.page');
const SuperAdminList = require('../../pageobjects/superadmin.list');

describe('Super Admin list interactions', () => {
  it('Homepage should be deployed', async () => {
    await Homepage.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Super Admin main page should be deployed', async () => {
    await SuperAdminList.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/super-admins');

    await expect(SuperAdminList.searchInput).toBeDisplayed();
    await SuperAdminList.setSearchFirstName('Axel');
    await expect(SuperAdminList.superAdminTitle).toBeDisplayed();
    await expect(SuperAdminList.superAdminTitle).toHaveText('Super Admins');
    await expect(SuperAdminList.table).toBeDisplayed();
    await expect(SuperAdminList.tableHead).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1FirstName).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1LastName).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1Email).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1Id).toBeDisplayed();
  });
  it('Buttons clickables', async () => {
    await expect(SuperAdminList.superAdmin1EditButton).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1EditButton).toBeClickable;
    await expect(SuperAdminList.superAdmin1DeleteButton).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1DeleteButton).toBeClickable;
    await expect(SuperAdminList.addSuperAdmin).toBeDisplayed();
    await expect(SuperAdminList.addSuperAdmin).toBeClickable;
  });
  it('Delete an Super Admin', async () => {
    await SuperAdminList.deleteSuperAdmin();
  });
});
