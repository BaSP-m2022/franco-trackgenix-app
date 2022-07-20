const EmployeeForm = require('../../../pageobjects/employees/employees.form');
const LoginPage = require('../../../pageobjects/login/login.page');

beforeAll('login', async () => {
  LoginPage.open();
  LoginPage.login('admin@gmail.com', 'admin123');
  browser.url('https://franco-trackgenix-app.vercel.app/employees/form');
});

beforeEach('Refresh page', async () => {
  browser.refresh();
  browser.url('https://franco-trackgenix-app.vercel.app/employees/form');
});
describe('Test empty erros inputs cases', () => {
  it('invalid date error form alter cases', async () => {
    await EmployeeForm.setValuesb('111', '111', 'a', '1', 'a', 'aaaaaaaaa');
    await EmployeeForm.saveButton.click();
    const errorMsg = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(1) > p'
    );
    const errorMsg2 = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(2) > p'
    );
    const errorMsg3 = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(3) > p'
    );
    const errorMsg4 = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(4) > p'
    );
    const errorMsg5 = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(5) > p'
    );
    await expect(errorMsg).toBeDisplayed();
    const errorMsg6 = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(6) > p'
    );
    await expect(errorMsg).toHaveText('First Name must have only letters');
    await expect(errorMsg2).toBeDisplayed();
    await expect(errorMsg2).toHaveText('Last Name must have only letters');
    await expect(errorMsg3).toBeDisplayed();
    await expect(errorMsg3).toHaveText('"dateOfBirth" must be a valid date');
    await expect(errorMsg4).toBeDisplayed();
    await expect(errorMsg4).toHaveText('DNI must have between 7 and 8 characters');
    await expect(errorMsg5).toBeDisplayed();
    await expect(errorMsg5).toHaveText('Your email must be a valid email');
    await expect(errorMsg6).toBeDisplayed();
    await expect(errorMsg6).toHaveText('Password must have at least 1 number');
    await EmployeeForm.passwordInput.clearValue();
    await EmployeeForm.passwordInput.setValue('11111111');
    await expect(errorMsg6).toBeDisplayed();
    await expect(errorMsg6).toHaveText('Password must have at least 1 letter');
  });
});
