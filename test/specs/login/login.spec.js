const HomePage = require('../../pageobjects/home.page');
const LoginPage = require('../../pageobjects/login/login.page');
const Sidebar = require('../../pageobjects/common-page-items/aside.page');

beforeAll('Open Browser', () => {
   HomePage.open();
});

describe('E2e test login successfully', () => {
  it ('On home page, click on login button', async () => {
    await expect(HomePage.loginButton).toBeClickable();
    await HomePage.loginButton.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/login');
  });
  it('Complete fields whit valid data en login successfull', async () => {
    await expect(LoginPage.emailInput).toBeDisplayed();
    await expect(LoginPage.passwordInput).toBeDisplayed();
    await LoginPage.login('wdiotest@gmail.com', 'test1234');
  });
  it('If we login, we should be redirected to home', async () => {
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/home');
    const hiButton = await $('//*[@id="root"]/div/header/div[2]/button[1]')
    const hiMsg = await hiButton.getText();
    await expect(hiMsg).toBe('Hi, Wdio');
  })
  it('The endpoints shown are the ones the employee has access to', async () => {
    await expect(Sidebar.homeRef).toBeDisplayed();
    await expect(Sidebar.homeRef).toBeClickable();
    await expect(Sidebar.timesheetsRef).toBeDisplayed();
    await expect(Sidebar.timesheetsRef).toBeClickable();
    await expect(Sidebar.adminsRef).not.toBeDisplayed();
    await expect(Sidebar.projectsRef).not.toBeDisplayed();
    await expect(Sidebar.employeesRef).not.toBeDisplayed();
  })
});