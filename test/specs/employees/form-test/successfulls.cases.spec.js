const EmployeeForm = require('../../../pageobjects/employees/employees.form');
const EmployeesPage = require('../../../pageobjects/employees/employees.page');

beforeAll('Open Browser', async () => {
  await EmployeeForm.open();
});

describe('Test all successfull Cases', () => {
  it('If we put valid credentials we can create an employee and go back to the form', async () => {
    await EmployeeForm.setValues(
      'Matias',
      'Vadala',
      '10/10/1998',
      '12345678',
      'false@gmail.com',
      'passtest1'
    );
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('Employee created successfully!');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Employee created');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees');
  });
  it('We can edit employee if we use a valid credentials', async () => {
    await expect(EmployeesPage.editButton).toBeDisplayed();
    await expect(EmployeesPage.editButton).toBeClickable();
    await EmployeesPage.editButton.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees/form');
    await EmployeeForm.setValues(
      'Matias',
      'Vadala',
      '10/10/1998',
      '12345678',
      'false@gmail.com',
      'passtest1'
    );
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('Employee updated successfully!');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Employee updated');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees');
  });
});
