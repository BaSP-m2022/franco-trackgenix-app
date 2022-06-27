const EmployeeForm = require('../../../pageobjects/employees/employees.form');

beforeAll('Open Browser', async () => {
  await EmployeeForm.open();
});
afterEach('Refresh page', async () => {
  browser.url('https://franco-trackgenix-app.vercel.app/employees/form');
});
describe('Test all empty inputs cases', () => {
  it('If we put empty first name we can not create an employee', async () => {
    await EmployeeForm.setValuesb(
      '',
      'Vadala',
      '10/10/1998',
      '12345678',
      'false@gmail.com',
      'aaaaaaa12'
    );
    await EmployeeForm.saveButton.scrollIntoView();
    await EmployeeForm.saveButton.click();
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('"firstName" is not allowed to be empty');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
  it('If we put empty last name we can not create an employee', async () => {
    await EmployeeForm.setValuesb(
      'Matias',
      '',
      '10/10/1998',
      '12345678',
      'false@gmail.com',
      'aaaaaaa12'
    );
    await EmployeeForm.saveButton.scrollIntoView();
    await EmployeeForm.saveButton.click();
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('"lastName" is not allowed to be empty');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
  it('If we put empty date we can not create an employee', async () => {
    await EmployeeForm.setValuesb(
      'Matias',
      'Vadala',
      '',
      '12345678',
      'false@gmail.com',
      'aaaaaaa12'
    );
    await EmployeeForm.saveButton.scrollIntoView();
    await EmployeeForm.saveButton.click();
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('"dateOfBirth" must be a valid date');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
  it('If we put empty dni we can not create an employee', async () => {
    await EmployeeForm.setValuesb(
      'Matias',
      'Vadala',
      '10/10/1998',
      '',
      'false@gmail.com',
      'aaaaaaa12'
    );
    await EmployeeForm.saveButton.scrollIntoView();
    await EmployeeForm.saveButton.click();
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('"dni" is not allowed to be empty');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
  it('If we put empty email we can not create an employee', async () => {
    await EmployeeForm.setValuesb('Matias', 'Vadala', '10/10/1998', '12345678', '', 'aaaaaaa12');
    await EmployeeForm.saveButton.scrollIntoView();
    await EmployeeForm.saveButton.click();
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('"email" is not allowed to be empty');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
  it('If we put empty pass we can not create an employee', async () => {
    await EmployeeForm.setValuesb(
      'Matias',
      'Vadala',
      '10/10/1998',
      '12345678',
      'false@gmail.com',
      ''
    );
    await EmployeeForm.saveButton.scrollIntoView();
    await EmployeeForm.saveButton.click();
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('"password" is not allowed to be empty');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
});
