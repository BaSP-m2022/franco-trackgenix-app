const AdminList = require('../../pageobjects/admin.list');
const AdminForm = require('../../pageobjects/admin.form');

describe('Add admin page interactions', () => {
  it('Elements displayed', async () => {
    await AdminList.open();
    await AdminList.addAdmin.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins/form');
    await expect(AdminForm.formTitle).toBeDisplayed();
    await expect(AdminForm.formTitle).toHaveText('Add Admin');
    await expect(AdminForm.firstName).toBeDisplayed();
    await expect(AdminForm.firstName).toHaveText('First name');
    await expect(AdminForm.lastName).toBeDisplayed();
    await expect(AdminForm.lastName).toHaveText('Last name');
    await expect(AdminForm.email).toBeDisplayed();
    await expect(AdminForm.email).toHaveText('Email');
    await expect(AdminForm.password).toBeDisplayed();
    await expect(AdminForm.password).toHaveText('Password');
    await expect(AdminForm.returnButton).toBeDisplayed();
    await expect(AdminForm.returnButton).toBeClickable();
    await expect(AdminForm.saveButton).toBeDisplayed();
    await expect(AdminForm.saveButton).toBeClickable();
  });
  it('Inputs enables', async () => {
    await expect(AdminForm.firstNameInput).toBeEnabled();
    await expect(AdminForm.lastnameInput).toBeEnabled();
    await expect(AdminForm.emailInput).toBeEnabled();
    await expect(AdminForm.passwordInput).toBeEnabled();
  });
  it('Add an admin success', async () => {
    await AdminForm.addAdmin('Laura', 'Sammartino', 'laurasammartino@hotmail.com', 'qqqq1111');
  });
});
