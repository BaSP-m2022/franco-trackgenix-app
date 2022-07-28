const EmployeesProgress = require('../../../pageobjects/employees/employees.progress');
const LoginPage = require('../../../pageobjects/login/login.page');

beforeAll('login', async () => {
  browser.url('https://franco-trackgenix-4jgg9r43j-basp-m2022.vercel.app/login');
  LoginPage.login('lauramedica141@gmail.com', 'test1234');
});

describe('Test all successfull cases', () => {
  it('Elements displayed', async () => {
    await expect(EmployeesProgress.title).toBeDisplayed();
    await expect(EmployeesProgress.table).toBeDisplayed();
    await expect(EmployeesProgress.backButton).toBeDisplayed();
    await expect(EmployeesProgress.forwardButton).toBeDisplayed();
    await expect(EmployeesProgress.currentWeek).toBeDisplayed();
    await expect(EmployeesProgress.workedHoursDay2Project1).toHaveText('6');
    await expect(EmployeesProgress.workedHoursDay7Project1).toHaveText('2');
    await expect(EmployeesProgress.workedHoursTotalProject1).toHaveText('8');
    await expect(EmployeesProgress.addProgressButton).toBeDisplayed();
  });
  it('Add new progress', async () => {
    await expect(EmployeesProgress.addProgressButton).toBeClickable();
    await EmployeesProgress.addProgressButton.click();
    await expect(EmployeesProgress.addProgressModal).toBeDisplayed();
    await expect(EmployeesProgress.addTaskButton).toBeDisplayed();
    await expect(EmployeesProgress.addTaskButton).toBeClickable();
    await EmployeesProgress.addTaskButton.click();
    await expect(EmployeesProgress.selectDate4).toBeDisplayed();
    await expect(EmployeesProgress.selectProject4).toBeDisplayed();
    await expect(EmployeesProgress.selectDescription4).toBeDisplayed();
    await expect(EmployeesProgress.selectWorkedHours4).toBeDisplayed();
    await EmployeesProgress.selectDate4.click();
    await EmployeesProgress.selectDate4Option2.click();
    await EmployeesProgress.selectProject4.click();
    await EmployeesProgress.selectProject4Option1.click();
    await EmployeesProgress.changeDescription4('Testing');
    await EmployeesProgress.changeWorkedHours4('1');
    await EmployeesProgress.saveButton.click();
    await EmployeesProgress.modalOkButton.click();
    await expect(EmployeesProgress.workedHoursDay1Project1).toHaveText('1');
    await expect(EmployeesProgress.workedHoursTotalProject1).toHaveText('9');
  });
  it('Edit progress', async () => {
    await EmployeesProgress.addProgressButton.click();
    await EmployeesProgress.changeWorkedHours1('5');
    await EmployeesProgress.saveButton.click();
    await expect(EmployeesProgress.modalBox).toBeDisplayed();
    await EmployeesProgress.modalOkButton.click();
    await expect(EmployeesProgress.workedHoursDay2Project1).toHaveText('5');
    await expect(EmployeesProgress.workedHoursTotalProject1).toHaveText('8');
  });
});
