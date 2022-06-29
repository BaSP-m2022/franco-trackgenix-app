const AdminList = require('../../pageobjects/admin.list');
const AdminForm = require('../../pageobjects/admin.form');

describe('Edit admin page interactions', () => {
  it('Elements displayed', async () => {
    await AdminList.open();
    await AdminList.admin1EditButton.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins/form');
    await expect(AdminForm.formTitle).toBeDisplayed();
    await expect(AdminForm.formTitle).toHaveText('Update Admin');
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
  it('Edit an admin success', async () => {
    await AdminForm.updateAdmin('Laura', 'Sammartino', 'laurasammartino@hotmail.com', 'qqqq1111');
  });
  it('wrong data inputs', async () => {
    await AdminList.admin1EditButton.click();
    await AdminForm.updateAdminFailed('1', '1', '1', '1');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success First Name', async () => {
    await AdminForm.updateAdminFailed('Higinia', '1', '1', '1');
    await expect(AdminForm.firstNameMsg).not.toHaveText();
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success Last Name', async () => {
    await AdminForm.updateAdminFailed('1', 'Medica', '1', '1');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).not.toHaveText();
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success Email', async () => {
    await AdminForm.updateAdminFailed('1', '1', 'higinia@gmail.com', '1');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).not.toHaveText();
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success password', async () => {
    await AdminForm.updateAdminFailed('1', '1', '1', 'hola1111');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).not.toHaveText();
  });
  it('Long failed password', async () => {
    await AdminForm.updateAdminFailed('1', '1', '1', 'hola11111111111111111');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" length must be less than or equal to 12 characters long'
    );
  });
  it('Failed password', async () => {
    await AdminForm.updateAdminFailed('1', '1', '1', 'aaaaaaaa');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" with value "aaaaaaaa" fails to match the required pattern: /[0-9]/'
    );
  });
  it('empty inputs', async () => {
    await AdminForm.open();
    await AdminForm.updateAdminFailed();
    await expect(AdminForm.firstNameMsg).toHaveText('"firstName" is not allowed to be empty');
    await expect(AdminForm.lastnameMsg).toHaveText('"lastName" is not allowed to be empty');
    await expect(AdminForm.emailMsg).toHaveText('"email" is not allowed to be empty');
    await expect(AdminForm.passwordMsg).toHaveText('"password" is not allowed to be empty');
    await AdminForm.returnButton.click();
  });
});
