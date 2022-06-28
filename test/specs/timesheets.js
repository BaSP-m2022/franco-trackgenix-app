const TrackgenixPage = require('../pageobjects/trackgenix.page');

describe('Timesheets section testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Timesheets section redirection', async () => {
    await expect(TrackgenixPage.btnTimesheets).toBeDisplayed();
    await expect(TrackgenixPage.btnTimesheets).toBeClickable();
    await TrackgenixPage.timesheetsSection();
  });
});
