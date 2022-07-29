const SuperAdminList = require('../../pageobjects/superadmin.list');
const SuperAdminForm = require('../../pageobjects/superadmin.form');
const Homepage = require('../../pageobjects/home.page');
const { name, lastname } = require('../../pageobjects/Random.data');

describe('Edit Super Admin page interactions', () => {
  beforeAll('Homepage should be deployed and Log In success', async () => {
    browser.fullscreenWindow();
    await Homepage.open();
    await SuperAdminList.loginSA('noborrar@hotmail.com', '1234567q');
  });
  it('Elements displayed', async () => {
    browser.fullscreenWindow();
    await SuperAdminList.superAdmin1EditButton.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins/form');
    await expect(SuperAdminForm.formTitle).toBeDisplayed();
    await expect(SuperAdminForm.formTitle).toHaveText('Update Admin');
    await expect(SuperAdminForm.firstName).toBeDisplayed();
    await expect(SuperAdminForm.firstName).toHaveText('First name');
    await expect(SuperAdminForm.lastName).toBeDisplayed();
    await expect(SuperAdminForm.lastName).toHaveText('Last name');
    await expect(SuperAdminForm.returnButton).toBeDisplayed();
    await expect(SuperAdminForm.returnButton).toBeClickable();
    await expect(SuperAdminForm.saveButton).toBeDisplayed();
    await expect(SuperAdminForm.saveButton).toBeClickable();
  });
  it('Inputs enables', async () => {
    browser.fullscreenWindow();
    await expect(SuperAdminForm.firstNameInput).toBeEnabled();
    await expect(SuperAdminForm.lastnameInput).toBeEnabled();
  });
  it('Edit an Super Admin success', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.updateSuperAdmin(name, lastname);
  });
  it('Wrong data inputs', async () => {
    browser.fullscreenWindow();
    await SuperAdminList.superAdmin1EditButton.click();
    await SuperAdminForm.updateSuperAdminFailed('1', '1');
    await expect(SuperAdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(SuperAdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
  });
  it('Just success First Name', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.updateSuperAdminFailed('Higinia', '1');
    await expect(SuperAdminForm.firstNameMsg).not.toHaveText();
    await expect(SuperAdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
  });
  it('Just success Last Name', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.updateSuperAdminFailed('1', 'Medica');
    await expect(SuperAdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(SuperAdminForm.lastnameMsg).not.toHaveText();
  });
  it('empty inputs', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.open();
    await SuperAdminForm.updateSuperAdminFailed();
    await expect(SuperAdminForm.firstNameMsg).toHaveText('"firstName" is not allowed to be empty');
    await expect(SuperAdminForm.lastnameMsg).toHaveText('"lastName" is not allowed to be empty');
    await SuperAdminForm.returnButton.click();
  });
});
