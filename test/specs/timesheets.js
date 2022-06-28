const TrackgenixPage = require('../pageobjects/trackgenix.page');
const TimesheetsPage = require('../pageobjects/timesheets.page');

describe('Timesheets section testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Timesheets section redirection', async () => {
    await expect(TrackgenixPage.btnTimesheets).toBeDisplayed();
    await expect(TrackgenixPage.btnTimesheets).toBeClickable();
    await TrackgenixPage.timesheetsSection();
  });
  it('Home section redirection and comeback to timesheets', async () => {
    await expect(TrackgenixPage.btnHome).toBeDisplayed();
    await expect(TrackgenixPage.btnHome).toBeClickable();
    await TrackgenixPage.homeSection();
    await TrackgenixPage.timesheetsSection();
  });
  it('Timesheets table display', async () => {
    await expect(TimesheetsPage.title).toBeDisplayed();
    await expect(TimesheetsPage.addTimesheet).toBeDisplayed();
    await expect(TimesheetsPage.addTimesheet).toBeClickable();
    await expect(TimesheetsPage.findTimesheet).toBeDisplayed();
    await expect(TimesheetsPage.table).toBeDisplayed();
    await expect(TimesheetsPage.firstNameHeader).toBeDisplayed();
    await expect(TimesheetsPage.lastNameHeader).toBeDisplayed();
    await expect(TimesheetsPage.tasksHeader).toBeDisplayed();
    await expect(TimesheetsPage.totalHoursHeader).toBeDisplayed();
    await expect(TimesheetsPage.statusHeader).toBeDisplayed();
    await expect(TimesheetsPage.startDateHeader).toBeDisplayed();
    await expect(TimesheetsPage.endDateHeader).toBeDisplayed();
    await expect(TimesheetsPage.idHeader).toBeDisplayed();
    await expect(TimesheetsPage.firstName1).toBeDisplayed();
    await expect(TimesheetsPage.lastName1).toBeDisplayed();
    await expect(TimesheetsPage.tasks1).toBeDisplayed();
    await expect(TimesheetsPage.totalHours1).toBeDisplayed();
    await expect(TimesheetsPage.status1).toBeDisplayed();
    await expect(TimesheetsPage.startDate1).toBeDisplayed();
    await expect(TimesheetsPage.endDate1).toBeDisplayed();
    await expect(TimesheetsPage.id1).toBeDisplayed();
    await expect(TimesheetsPage.btnEdit1).toBeDisplayed();
    await expect(TimesheetsPage.btnEdit1).toBeClickable();
    await expect(TimesheetsPage.btnDelete1).toBeDisplayed();
    await expect(TimesheetsPage.btnDelete1).toBeClickable();
  });
});
