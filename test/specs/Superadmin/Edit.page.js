const SuperAdminList = require('../../pageobjects/superadmin.list');
const SuperAdminForm = require('../../pageobjects/superadmin.form');

describe('Edit Super Admin page interactions', () => {
  it('Elements displayed', async () => {
    await SuperAdminList.open();
    await SuperAdminList.superAdmin1EditButton.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/super-admins/form');
    await expect(SuperAdminForm.formTitle).toBeDisplayed();
    await expect(SuperAdminForm.formTitle).toHaveText('Update Super Admin');
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
  it('Edit an Super Admin success', async () => {
    await SuperAdminForm.updateSuperAdmin(
      'Test',
      'Fiol',
      'laurasammartino@hotmail.com',
      'qqqq1111'
    );
  });
  it('Wrong data inputs', async () => {
    await SuperAdminList.superAdmin1EditButton.click();
    await SuperAdminForm.updateSuperAdminFailed('1', '1', '1', '1');
    await expect(SuperAdminForm.firstNameMsg).toHaveText(
      'First Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.lastnameMsg).toHaveText(
      'Last Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.emailMsg).toHaveText('Your email must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      'Password must have between 8 and 12 characters'
    );
  });
  it('Just success First Name', async () => {
    await SuperAdminForm.updateSuperAdminFailed('Higinia', '1', '1', '1');
    await expect(SuperAdminForm.firstNameMsg).not.toHaveText();
    await expect(SuperAdminForm.lastnameMsg).toHaveText(
      'Last Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.emailMsg).toHaveText('Your email must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      'Password must have between 8 and 12 characters'
    );
  });
  it('Just success Last Name', async () => {
    await SuperAdminForm.updateSuperAdminFailed('1', 'Medica', '1', '1');
    await expect(SuperAdminForm.firstNameMsg).toHaveText(
      'First Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.lastnameMsg).not.toHaveText();
    await expect(SuperAdminForm.emailMsg).toHaveText('Your email must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      'Password must have between 8 and 12 characters'
    );
  });
  it('Just success Email', async () => {
    await SuperAdminForm.updateSuperAdminFailed('1', '1', 'higinia@gmail.com', '1');
    await expect(SuperAdminForm.firstNameMsg).toHaveText(
      'First Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.lastnameMsg).toHaveText(
      'Last Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.emailMsg).not.toHaveText();
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      'Password must have between 8 and 12 characters'
    );
  });
  it('Just success password', async () => {
    await SuperAdminForm.updateSuperAdminFailed('1', '1', '1', 'hola1111');
    await expect(SuperAdminForm.firstNameMsg).toHaveText(
      'First Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.lastnameMsg).toHaveText(
      'Last Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.emailMsg).toHaveText('Your email must be a valid email');
    await expect(SuperAdminForm.passwordMsg).not.toHaveText();
  });
  it('Long failed password', async () => {
    await SuperAdminForm.updateSuperAdminFailed('1', '1', '1', 'hola11111111111111111');
    await expect(SuperAdminForm.firstNameMsg).toHaveText(
      'First Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.lastnameMsg).toHaveText(
      'Last Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.emailMsg).toHaveText('Your email must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      'Password must have between 8 and 12 characters'
    );
  });
  it('empty inputs', async () => {
    await SuperAdminForm.open();
    await SuperAdminForm.updateSuperAdminFailed();
    await expect(SuperAdminForm.firstNameMsg).toHaveText('"firstName" is not allowed to be empty');
    await expect(SuperAdminForm.lastnameMsg).toHaveText('"lastName" is not allowed to be empty');
    await expect(SuperAdminForm.emailMsg).toHaveText('"email" is not allowed to be empty');
    await expect(SuperAdminForm.passwordMsg).toHaveText('"password" is not allowed to be empty');
    await SuperAdminForm.returnButton.click();
  });
});
