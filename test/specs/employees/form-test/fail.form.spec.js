const EmployeeForm = require('../../../pageobjects/employees/employees.form');

beforeAll('Open Browser', async () => {
  await EmployeeForm.open();
});

describe('Test all error Cases', () => {
  it('If we put invalid name we can not create an employee', async () => {
    await EmployeeForm.setValues(
      'a',
      'Vadala',
      '10/10/1998',
      '12345678',
      'false@gmail.com',
      'passtest1'
    );
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('First Name must have at least 3 characters');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
  it('If we put invalid last name we can not create an employee', async () => {
    await EmployeeForm.setValues(
      'Matias',
      'a',
      '10/10/1998',
      '12345678',
      'false@gmail.com',
      'passtest1'
    );
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('Last Name must have at least 3 characters');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
  it('If we put invalid dni we can not create an employee', async () => {
    await EmployeeForm.setValues(
      'Matias',
      'Vadala',
      '10/10/1998',
      '1',
      'false@gmail.com',
      'passtest1'
    );
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('DNI must have between 7 and 8 characters');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
  it('If we put invalid email we can not create an employee', async () => {
    await EmployeeForm.setValues('Matias', 'Vadala', '10/10/1998', '12345678', '1', 'passtest1');
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('Your email must be a valid email');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
  it('If we put invalid password we can not create an employee', async () => {
    await EmployeeForm.setValues(
      'Matias',
      'Vadala',
      '10/10/1998',
      '12345678',
      'false@gmail.com',
      '1'
    );
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('Password must have between 8 and 12 characters');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
  it('If we put invalid name we can not create an employee', async () => {
    await EmployeeForm.setValues(
      'Matias',
      'Vadala',
      '10/10/1998',
      '12345678',
      'false@gmail.com',
      'aaaaaaaa'
    );
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('Password must have at least 1 number');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Error');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
  });
});
