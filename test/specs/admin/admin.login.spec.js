const LoginPage = require('../../pageobjects/login/login.page');
const Sidebar = require('../../pageobjects/common-page-items/aside.page');

beforeAll('Open Browser', () => {
  LoginPage.open();
});

describe('open test', () => {
  it('open', async () => {
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/login');
  });
  it('login', async () => {
    await LoginPage.login('admin@gmail.com', 'admin123');
  });
  it('Check admin entities', async () => {
    await expect(Sidebar.homeRef).toBeDisplayed();
    await expect(Sidebar.homeRef).toBeClickable();
    await expect(Sidebar.timesheetsRef).toBeDisplayed();
    await expect(Sidebar.timesheetsRef).toBeClickable();
    await expect(Sidebar.employeesRef).toBeDisplayed();
    await expect(Sidebar.employeesRef).toBeClickable();
    await expect(Sidebar.projectsRef).toBeDisplayed();
    await expect(Sidebar.projectsRef).toBeClickable();
  });
});
