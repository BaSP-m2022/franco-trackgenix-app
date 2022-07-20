const EmployeeForm = require('../../../pageobjects/employees/employees.form');
const EmployeesPage = require('../../../pageobjects/employees/employees.page');
const LoginPage = require('../../../pageobjects/login/login.page');
const { name, lastname, dateToReturn, randomDni, randomEmail } = require('../../randomizer');

beforeAll('login', async () => {
  LoginPage.open();
  LoginPage.login('admin@gmail.com', 'admin123');
});

describe('Test all successfull Cases', () => {
  it('If we put valid credentials we can create an employee and go back to the form', async () => {
    await EmployeesPage.addEmployee.click();
    await EmployeeForm.setValues(
      name,
      lastname,
      dateToReturn,
      randomDni(),
      randomEmail(),
      'test1234'
    );
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div > div.modal_modalDivChildren__2FU_o > p'
    );
    await expect(modalMsg).toHaveText('Employee created successfully!');
    const modalTitle = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div > div.modal_modalDivTitle__3Te57 > h3'
    );
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
      name,
      lastname,
      dateToReturn,
      randomDni(),
      randomEmail(),
      'test1234'
    );
    await expect(EmployeeForm.Message).toBeDisplayed();
    const modalMsg = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div > div.modal_modalDivChildren__2FU_o > p'
    );
    await expect(modalMsg).toHaveText('Employee updated successfully!');
    const modalTitle = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div > div.modal_modalDivTitle__3Te57 > h3'
    );
    await expect(modalTitle).toHaveText('Employee updated');
    await expect(EmployeeForm.Messagebutton).toBeDisplayed();
    await expect(EmployeeForm.Messagebutton).toBeClickable();
    await EmployeeForm.Messagebutton.click();
    await expect(EmployeeForm.Message).not.toBeDisplayed();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees');
  });
});
