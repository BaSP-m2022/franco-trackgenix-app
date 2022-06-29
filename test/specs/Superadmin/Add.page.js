const SuperAdminForm = require('../../pageobjects/superadmin.form');

describe('Add superAdmin page interactions', () => {
  it('Elements displayed', async () => {
    await SuperAdminForm.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/super-admins/form');
    await expect(SuperAdminForm.formTitle).toBeDisplayed();
    await expect(SuperAdminForm.formTitle).toHaveText('Add Super Admin');
    await expect(SuperAdminForm.firstName).toBeDisplayed();
    await expect(SuperAdminForm.firstName).toHaveText('First name');
    await expect(SuperAdminForm.lastName).toBeDisplayed();
    await expect(SuperAdminForm.lastName).toHaveText('Last name');
    await expect(SuperAdminForm.email).toBeDisplayed();
    await expect(SuperAdminForm.email).toHaveText('Email');
    await expect(SuperAdminForm.password).toBeDisplayed();
    await expect(SuperAdminForm.password).toHaveText('Password');
    await expect(SuperAdminForm.returnButton).toBeDisplayed();
    await expect(SuperAdminForm.returnButton).toBeClickable();
    await expect(SuperAdminForm.saveButton).toBeDisplayed();
    await expect(SuperAdminForm.saveButton).toBeClickable();
  });
  it('Inputs enables', async () => {
    await expect(SuperAdminForm.firstNameInput).toBeEnabled();
    await expect(SuperAdminForm.lastnameInput).toBeEnabled();
    await expect(SuperAdminForm.emailInput).toBeEnabled();
    await expect(SuperAdminForm.passwordInput).toBeEnabled();
  });
  it('Add an superAdmin success', async () => {
    await SuperAdminForm.addSuperAdmin('Axel', 'Fiol', 'axel.fiol97@gmail.com', 'qqqq1111');
  });
});
