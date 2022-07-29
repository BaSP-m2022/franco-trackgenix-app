const SuperAdminList = require('../../pageobjects/superadmin.list');
const SuperAdminForm = require('../../pageobjects/superadmin.form');
const HeaderPage = require('../../pageobjects/header');
const AssidePage = require('../../pageobjects/asside');
const Homepage = require('../../pageobjects/home.page');

describe('Header/asside on list page', () => {
  beforeAll('Homepage should be deployed and Log In success', async () => {
    browser.fullscreenWindow();
    await Homepage.open();
    await SuperAdminList.loginSA('noborrar@hotmail.com', '1234567q');
  });
  it('Header on list page', async () => {
    browser.fullscreenWindow();
    await expect(HeaderPage.rrLogo).toBeDisplayed();
    await expect(HeaderPage.edit).toBeClickable();
    await expect(HeaderPage.edit).toBeDisplayed();
  });
  it('Aside on Signup page', async () => {
    browser.fullscreenWindow();
    await expect(AssidePage.menuAside).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeClickable();
    await expect(AssidePage.homeRef).toHaveHref('/admins');
  });
});

describe('Header/asside on form page', () => {
  it('Header on form page', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.open();
    await expect(HeaderPage.rrLogo).toBeDisplayed();
    await expect(HeaderPage.edit).toBeClickable();
    await expect(HeaderPage.edit).toBeDisplayed();
  });
  it('Aside on Signup page', async () => {
    browser.fullscreenWindow();
    await expect(AssidePage.menuAside).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeClickable();
    await expect(AssidePage.homeRef).toHaveHref('/admins');
  });
});
