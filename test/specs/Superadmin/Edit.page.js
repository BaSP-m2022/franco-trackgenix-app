const SuperAdminList = require('../../pageobjects/superadmin.list');
const SuperAdminForm = require('../../pageobjects/superadmin.form');
const Homepage = require('../../pageobjects/home.page');
const { name, lastname, randomEmail } = require('../../pageobjects/Random.data');

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
  it('Edit an Super Admin success', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.updateSuperAdmin(name, lastname, randomEmail(), 'test1234');
  });
  it('Wrong data inputs', async () => {
    browser.fullscreenWindow();
    await SuperAdminList.superAdmin1EditButton.click();
    await SuperAdminForm.updateSuperAdminFailed('1', '1', '1', '1');
    await expect(SuperAdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(SuperAdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(SuperAdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success First Name', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.updateSuperAdminFailed('Higinia', '1', '1', '1');
    await expect(SuperAdminForm.firstNameMsg).not.toHaveText();
    await expect(SuperAdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(SuperAdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success Last Name', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.updateSuperAdminFailed('1', 'Medica', '1', '1');
    await expect(SuperAdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(SuperAdminForm.lastnameMsg).not.toHaveText();
    await expect(SuperAdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success Email', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.updateSuperAdminFailed('1', '1', 'higinia@gmail.com', '1');
    await expect(SuperAdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(SuperAdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(SuperAdminForm.emailMsg).not.toHaveText();
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success password', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.updateSuperAdminFailed('1', '1', '1', 'hola1111');
    await expect(SuperAdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(SuperAdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(SuperAdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(SuperAdminForm.passwordMsg).not.toHaveText();
  });
  it('Long failed password', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.updateSuperAdminFailed('1', '1', '1', 'hola11111111111111111');
    await expect(SuperAdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(SuperAdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(SuperAdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      '"password" length must be less than or equal to 12 characters long'
    );
  });
  it('empty inputs', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.open();
    await SuperAdminForm.updateSuperAdminFailed();
    await expect(SuperAdminForm.firstNameMsg).toHaveText('"firstName" is not allowed to be empty');
    await expect(SuperAdminForm.lastnameMsg).toHaveText('"lastName" is not allowed to be empty');
    await expect(SuperAdminForm.emailMsg).toHaveText('"email" is not allowed to be empty');
    await expect(SuperAdminForm.passwordMsg).toHaveText('"password" is not allowed to be empty');
    await SuperAdminForm.returnButton.click();
  });
});
