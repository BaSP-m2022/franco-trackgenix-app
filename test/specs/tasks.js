const TrackgenixPage = require('../pageobjects/trackgenix.page');
const TasksPage = require('../pageobjects/tasks.page');

describe('Tasks section testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Tasks section redirection', async () => {
    await expect(TrackgenixPage.btnTasks).toBeDisplayed();
    await expect(TrackgenixPage.btnTasks).toBeClickable();
    await TrackgenixPage.tasksSection();
  });
  it('Home section redirection and comeback to tasks', async () => {
    await expect(TrackgenixPage.btnHome).toBeDisplayed();
    await expect(TrackgenixPage.btnHome).toBeClickable();
    await TrackgenixPage.homeSection();
    await TrackgenixPage.tasksSection();
  });
  it('Tasks table display', async () => {
    await expect(TasksPage.title).toBeDisplayed();
    await expect(TasksPage.addTask).toBeDisplayed();
    await expect(TasksPage.addTask).toBeClickable();
    await expect(TasksPage.findTask).toBeDisplayed();
    await expect(TasksPage.table).toBeDisplayed();
    await expect(TasksPage.idHeader).toBeDisplayed();
    await expect(TasksPage.descriptionHeader).toBeDisplayed();
    await expect(TasksPage.workedHoursHeader).toBeDisplayed();
    await expect(TasksPage.projectHeader).toBeDisplayed();
    await expect(TasksPage.dateHeader).toBeDisplayed();
    await expect(TasksPage.id1).toBeDisplayed();
    await expect(TasksPage.description1).toBeDisplayed();
    await expect(TasksPage.workedHours1).toBeDisplayed();
    await expect(TasksPage.project1).toBeDisplayed();
    await expect(TasksPage.date1).toBeDisplayed();
    await expect(TasksPage.btnEdit1).toBeDisplayed();
    await expect(TasksPage.btnEdit1).toBeClickable();
    await expect(TasksPage.btnDelete1).toBeDisplayed();
    await expect(TasksPage.btnDelete1).toBeClickable();
  });
});
