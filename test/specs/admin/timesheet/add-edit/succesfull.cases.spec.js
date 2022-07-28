const TimeSheetForm = require('../../../../pageobjects/time-sheets/time-sheets.form');
const TimeSheetsPage = require('../../../../pageobjects/time-sheets/time-sheets.page');
const LoginPage = require('../../../../pageobjects/login/login.page');
const Aside = require('../../../../pageobjects/common-page-items/aside.page');

beforeAll('login', async () => {
  await LoginPage.open();
  await LoginPage.login('admin@gmail.com', 'admin123');
  await Aside.timesheetsRef.click();
});

describe('first test', () => {
  it('We can add a TimeSheet whit valid date', async () => {
    await expect(TimeSheetsPage.addTimesheet).toBeDisplayed();
    await expect(TimeSheetsPage.addTimesheet).toBeClickable();
    await TimeSheetsPage.addTimesheet.click();
    await TimeSheetForm.setTimeSheet('01/08/2022', '20/08/2022', 'Just for testing', '45');
    const createMsg = await $('//*[@id="root"]/div/div/div[2]/div/div/div/div[2]/p');
    await expect(createMsg).toHaveText('TimeSheet has been created');
    const button = await $('//*[@id="root"]/div/div/div[2]/div/div/div/div[2]/div/button');
    await button.scrollIntoView();
    await expect(button).toBeClickable();
    await button.click();
  });
  it('We can edit a TimeSheet whit valid date', async () => {
    const editButton = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[4]/td[5]/div/button[1]'
    );
    await expect(editButton).toBeClickable();
    await editButton.click();
    await TimeSheetForm.editTimesheet('25/07/2022', '27/08/2022', 'Change Timsheet', '45');
    const createMsg = await $('//*[@id="root"]/div/div/div[2]/div/div/div/div[2]/p');
    await expect(createMsg).toHaveText('TimeSheet has been updated');
    const button = await $('//*[@id="root"]/div/div/div[2]/div/div/div/div[2]/div/button');
    await expect(button).toBeClickable();
    await button.click();
  });
});
