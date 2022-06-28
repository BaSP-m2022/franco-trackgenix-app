const TrackgenixPage = require('../pageobjects/trackgenix.page');
const TimesheetsPage = require('../pageobjects/timesheets.page');
const TimesheetsFormPage = require('../pageobjects/timesheets.form');

describe('Timesheets section testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Timesheets section redirection', async () => {
    await expect(TrackgenixPage.btnTimesheets).toBeDisplayed();
    await expect(TrackgenixPage.btnTimesheets).toBeClickable();
    await TrackgenixPage.timesheetsSection();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/time-sheets');
  });
  it('Home section redirection and comeback to timesheets', async () => {
    await expect(TrackgenixPage.btnHome).toBeDisplayed();
    await expect(TrackgenixPage.btnHome).toBeClickable();
    await TrackgenixPage.homeSection();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/home');
    await TrackgenixPage.timesheetsSection();
  });
  it('Timesheets table display', async () => {
    await expect(TimesheetsPage.title).toBeDisplayed();
    await expect(TimesheetsPage.addTimesheet).toBeDisplayed();
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
    await expect(TimesheetsPage.btnDelete1).toBeDisplayed();
  });

  it('Add timesheet form display', async () => {
    await expect(TimesheetsPage.addTimesheet).toBeClickable();
    await TimesheetsPage.timesheetsForm();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/time-sheets/form');
    await expect(TimesheetsFormPage.title).toBeDisplayed();
    await expect(TimesheetsFormPage.totalHours).toBeDisplayed();
    await expect(TimesheetsFormPage.status).toBeDisplayed();
    await expect(TimesheetsFormPage.startDate).toBeDisplayed();
    await expect(TimesheetsFormPage.endDate).toBeDisplayed();
    await expect(TimesheetsFormPage.employee).toBeDisplayed();
    await expect(TimesheetsFormPage.totalHours1).toBeDisplayed();
    await expect(TimesheetsFormPage.status1).toBeDisplayed();
    await expect(TimesheetsFormPage.startDate1).toBeDisplayed();
    await expect(TimesheetsFormPage.endDate1).toBeDisplayed();
    await expect(TimesheetsFormPage.employee1).toBeDisplayed();
    await expect(TimesheetsFormPage.btnAddTask).toBeDisplayed();
    await expect(TimesheetsFormPage.btnReturn).toBeDisplayed();
    await expect(TimesheetsFormPage.btnSave).toBeDisplayed();
  });

  it('Add timesheet', async () => {
    await expect(TimesheetsFormPage.btnAddTask).toBeClickable();
    await TimesheetsFormPage.addTask();
    await expect(TimesheetsFormPage.taskAdded).toBeDisplayed();
    await expect(TimesheetsFormPage.taskAdded1).toBeDisplayed();
    await expect(TimesheetsFormPage.taskAddedBtnDelete1).toBeDisplayed();
    await expect(TimesheetsFormPage.taskAddedBtnDelete1).toBeClickable();
    await TimesheetsFormPage.deleteTaskAdded1();
    await expect(TimesheetsFormPage.btnSave).toBeClickable();
    await TimesheetsFormPage.saveToTimesheets('50', '21/02/2022', '21/10/2022');
    await expect(TimesheetsPage.btnEdit1).toBeDisplayed();
    await expect(TimesheetsPage.btnEdit1).toBeClickable();
  });

  it('Return btn tryout and edit timesheet', async () => {
    await expect(TimesheetsPage.btnEdit1).toBeClickable();
    await TimesheetsPage.editTimesheet();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/time-sheets/form');
    await expect(TimesheetsFormPage.btnReturn).toBeClickable();
    await TimesheetsFormPage.returnToTimesheets();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/time-sheets');
    await expect(TimesheetsPage.btnEdit1).toBeClickable();
    await TimesheetsPage.editTimesheet();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/time-sheets/form');
    await expect(TimesheetsFormPage.btnAddTask).toBeClickable();
    await expect(TimesheetsFormPage.btnSave).toBeClickable();
    await TimesheetsFormPage.saveToTimesheets('60', '21/04/2022', '21/11/2022');
  });

  it('Delete timesheet: first no and then yes', async () => {
    await expect(TimesheetsPage.btnDelete1).toBeClickable();
    await TimesheetsPage.deleteTimesheet();
  });
});
