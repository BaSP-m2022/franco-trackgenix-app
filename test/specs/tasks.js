const TrackgenixPage = require('../pageobjects/trackgenix.page');

describe('Tasks section testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Tasks section redirection', async () => {
    await expect(TrackgenixPage.btnTasks).toBeDisplayed();
    await expect(TrackgenixPage.btnTasks).toBeClickable();
    await TrackgenixPage.tasksSection();
  });
});
