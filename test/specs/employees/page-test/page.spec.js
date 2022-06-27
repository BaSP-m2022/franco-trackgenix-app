const EmployeesPage = require('../../../pageobjects/employees/employees.page');
const EmployeeForm = require('../../../pageobjects/employees/employees.form');

beforeAll('Open Browser', () => {
  browser.url('https://franco-trackgenix-cn8vl70bb-basp-m2022.vercel.app/employees');
});

afterEach('Refresh page', () => {
  browser.url('https://franco-trackgenix-cn8vl70bb-basp-m2022.vercel.app/employees');
});

describe('Test Employee main page interactions', () => {
  it('If we delete an employee, it is should be dissapear', async () => {
    const name1 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]'
    ).getText();
    await expect(EmployeesPage.deleteButton).toBeDisplayed();
    await expect(EmployeesPage.deleteButton).toBeClickable();
    await EmployeesPage.deleteButton.click();
    const x = await $('//*[@id="root"]/div/div/div[2]/section/div[1]/div/div[2]/div/div/button[1]');
    await expect(x).toBeDisplayed();
    await expect(x).toBeClickable();
    await x.click();
    const name2 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]'
    ).getText();
    let comparation = false;
    if (name1 !== name2) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
  it('If we delete an employee, the second row now, should be the first', async () => {
    const name1 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[2]/td[2]'
    ).getText();
    await expect(EmployeesPage.deleteButton).toBeDisplayed();
    await expect(EmployeesPage.deleteButton).toBeClickable();
    await EmployeesPage.deleteButton.click();
    const x = await $('//*[@id="root"]/div/div/div[2]/section/div[1]/div/div[2]/div/div/button[1]');
    await expect(x).toBeDisplayed();
    await expect(x).toBeClickable();
    await x.click();
    const name2 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]'
    ).getText();
    let comparation = false;
    if (name1 == name2) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
  it('We can filter an employee correctly', async () => {
    const name1 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[2]/td[2]'
    ).getText();
    const inputSearch = await $('//*[@id="header-search"]');
    await inputSearch.setValue(name1);
    const name2 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]'
    ).getText();
    let comparation = false;
    if (name1 == name2) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
  it('Add Employee button should be redirect us to the add form', async () => {
    await expect(EmployeesPage.addEmployee).toBeDisplayed();
    await expect(EmployeesPage.addEmployee).toBeClickable();
    await EmployeesPage.addEmployee.click();
    // await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees/form'); //
    await expect(EmployeeForm.employeeTitle).toBeDisplayed();
    await expect(EmployeeForm.employeeTitle).toHaveText('Add Employee');
  });
  it('Edit Employee button should be redirect us to the add form', async () => {
    await expect(EmployeesPage.editButton).toBeDisplayed();
    await expect(EmployeesPage.editButton).toBeClickable();
    await EmployeesPage.editButton.click();
    // await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees/form'); //
    await expect(EmployeeForm.employeeTitle).toBeDisplayed();
    await expect(EmployeeForm.employeeTitle).toHaveText('Edit Employee');
  });
});
