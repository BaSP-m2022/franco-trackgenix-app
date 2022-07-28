const SuperAdminForm = require('../../pageobjects/superadmin.form');
const SuperAdminList = require('../../pageobjects/superadmin.list');
const Homepage = require('../../pageobjects/home.page');
const { name, lastname, randomEmail } = require('../../pageobjects/Random.data');

describe('Add superAdmin page interactions', () => {
  beforeAll('Homepage should be deployed and Log In success', async () => {
    browser.fullscreenWindow();
    await Homepage.open();
    await SuperAdminList.loginSA('noborrar@hotmail.com', '1234567q');
  });
  it('Elements displayed', async () => {
    browser.fullscreenWindow();
    await SuperAdminList.addSuperAdmin.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins/form');
    await expect(SuperAdminForm.formTitle).toBeDisplayed();
    await expect(SuperAdminForm.formTitle).toHaveText('Add Admin');
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
    browser.fullscreenWindow();
    await expect(SuperAdminForm.firstNameInput).toBeEnabled();
    await expect(SuperAdminForm.lastnameInput).toBeEnabled();
    await expect(SuperAdminForm.emailInput).toBeEnabled();
    await expect(SuperAdminForm.passwordInput).toBeEnabled();
  });
  it('Add an superAdmin success', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.addSuperAdmin(name, lastname, randomEmail(), 'test1234');
  });
});
