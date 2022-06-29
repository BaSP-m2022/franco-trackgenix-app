const Homepage = require('../../pageobjects/home.page');
const AdminList = require('../../pageobjects/admin.list');

describe('Admin list interactions', () => {
  it('Homepage should be deployed', async () => {
    await Homepage.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Admin main page should be deployed', async () => {
    await AdminList.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins');

    await expect(AdminList.searchInput).toBeDisplayed();
    await AdminList.setSearchFirstName('Laura');
    await expect(AdminList.adminTitle).toBeDisplayed();
    await expect(AdminList.adminTitle).toHaveText('Admins');
    await expect(AdminList.table).toBeDisplayed();
    await expect(AdminList.tableHead).toBeDisplayed();
    await expect(AdminList.admin1FirstName).toBeDisplayed();
    await expect(AdminList.admin1LastName).toBeDisplayed();
    await expect(AdminList.admin1Email).toBeDisplayed();
    await expect(AdminList.admin1Id).toBeDisplayed();
  });
  it('Buttons clickables', async () => {
    await expect(AdminList.admin1EditButton).toBeDisplayed();
    await expect(AdminList.admin1EditButton).toBeClickable;
    await expect(AdminList.admin1DeleteButton).toBeDisplayed();
    await expect(AdminList.admin1DeleteButton).toBeClickable;
    await expect(AdminList.addAdmin).toBeDisplayed();
    await expect(AdminList.addAdmin).toBeClickable;
  });
  it('Delete an admin', async () => {
    await AdminList.deleteAdmin();
  });
});
