const EmployeeForm = require('../../../../../pageobjects/employees/employees.form');
const LoginPage = require('../../../../../pageobjects/login/login.page');

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
  it('Empty error form', async () => {
    await EmployeeForm.setValuesb('', '', '', '', '', '');
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
    await expect(errorMsg).toHaveText('"firstName" is not allowed to be empty');
    await expect(errorMsg2).toBeDisplayed();
    await expect(errorMsg2).toHaveText('"lastName" is not allowed to be empty');
    await expect(errorMsg3).toBeDisplayed();
    await expect(errorMsg3).toHaveText('"dateOfBirth" must be a valid date');
    await expect(errorMsg4).toBeDisplayed();
    await expect(errorMsg4).toHaveText('"dni" is not allowed to be empty');
    await expect(errorMsg5).toBeDisplayed();
    await expect(errorMsg5).toHaveText('"email" is not allowed to be empty');
    await expect(errorMsg6).toBeDisplayed();
    await expect(errorMsg6).toHaveText('"password" is not allowed to be empty');
  });
  it('invalid date error form', async () => {
    await browser.url('https://franco-trackgenix-app.vercel.app/employees/form');
    await EmployeeForm.setValuesb('a', 'a', 'a', 'a', 'a', 'a');
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
    await expect(errorMsg).toHaveText('First Name must have at least 3 characters');
    await expect(errorMsg2).toBeDisplayed();
    await expect(errorMsg2).toHaveText('Last Name must have at least 3 characters');
    await expect(errorMsg3).toBeDisplayed();
    await expect(errorMsg3).toHaveText('"dateOfBirth" must be a valid date');
    await expect(errorMsg4).toBeDisplayed();
    await expect(errorMsg4).toHaveText('You can use only integers numbers');
    await expect(errorMsg5).toBeDisplayed();
    await expect(errorMsg5).toHaveText('Your email must be a valid email');
    await expect(errorMsg6).toBeDisplayed();
    await expect(errorMsg6).toHaveText('Password must have between 8 and 12 characters');
  });
});
