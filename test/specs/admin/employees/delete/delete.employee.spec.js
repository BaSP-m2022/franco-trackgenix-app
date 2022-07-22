const LoginPage = require('../../../../pageobjects/login/login.page');

// const EmployeesPage = require('../../../../pageobjects/employees/employees.page');
// const EmployeeForm = require('../../../../pageobjects/employees/employees.form');

const deleteEmployee = async () => {
  const x = await $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[6]/div/button[2]');
  await expect(x).toBeDisplayed();
  await expect(x).toBeClickable();
  await x.click();
  const modal = await $('//*[@id="root"]/div/div/div[2]/section/div[1]/div');
  await expect(modal).toBeDisplayed();
  const yesButton = await $(
    '//*[@id="root"]/div/div/div[2]/section/div[1]/div/div[2]/div/div/button[1]'
  );
  await expect(yesButton).toBeDisplayed();
  await expect(yesButton).toBeClickable();
  await yesButton.click();
};

beforeAll('Login whit admin', () => {
  LoginPage.open();
  LoginPage.login('admin@gmail.com', 'admin123');
});

beforeEach('Refresh page', () => {
  browser.refresh();
});

describe('Test delete interactions', () => {
  it('If we delete an employee, it is should be dissapear', async () => {
    const name1 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]'
    ).getText();
    await deleteEmployee();
    const name2 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]'
    ).getText();
    let comparation = false;
    if (name1 !== name2) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
  it('If we delete an employee, the second row now, should be the first', async () => {
    const name1 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[2]/td[1]'
    ).getText();
    await deleteEmployee();
    const name2 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]'
    ).getText();
    //eslint-disable-next-line
    await browser.pause(3000);
    let comparation = false;
    if (name1 == name2) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
});
