const EmployeesPage = require('../../../pageobjects/employees/employees.page');
const EmployeeForm = require('../../../pageobjects/employees/employees.form');

beforeAll('Open Browser', async () => {
  await EmployeesPage.open();
});

describe('Test all Forms web items', () => {
  it('Access to the add form from add employee button correctly', async () => {
    await expect(EmployeesPage.addEmployee).toBeDisplayed();
    await expect(EmployeesPage.addEmployee).toBeClickable();
    await EmployeesPage.addEmployee.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees/form');
    await expect(EmployeeForm.employeeTitle).toBeDisplayed();
    await expect(EmployeeForm.employeeTitle).toHaveText('Add Employee');
    await expect(EmployeeForm.saveButton).toBeDisplayed();
    await expect(EmployeeForm.saveButton).toHaveText('Add Employee');
  });
  it('Access to the Update form from add employee button correctly', async () => {
    await EmployeesPage.open();
    await expect(EmployeesPage.editButton).toBeDisplayed();
    await expect(EmployeesPage.editButton).toBeClickable();
    await EmployeesPage.editButton.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees/form');
    await expect(EmployeeForm.employeeTitle).toBeDisplayed();
    await expect(EmployeeForm.employeeTitle).toHaveText('Edit Employee');
    await expect(EmployeeForm.saveButton).toBeDisplayed();
    await expect(EmployeeForm.saveButton).toHaveText('Update Employee');
  });
});
