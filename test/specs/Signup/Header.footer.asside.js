const Signup = require('../../pageobjects/signup');
const HeaderPage = require('../../pageobjects/header');
const AssidePage = require('../../pageobjects/asside');

describe('Header/asside on Signup page', () => {
  it('Header on Signup page', async () => {
    browser.fullscreenWindow();
    await Signup.open();
    await expect(HeaderPage.rrLogo).toBeDisplayed();
    await expect(HeaderPage.edit).toBeClickable();
    await expect(HeaderPage.edit).toBeDisplayed();
  });
  it('Aside on Signup page', async () => {
    browser.fullscreenWindow();
    await expect(AssidePage.menuAside).toBeDisplayed();
    await expect(AssidePage.contactUstext).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeClickable();
    await expect(AssidePage.homeRef).toHaveHref('/home');
    await expect(AssidePage.contact).toBeDisplayed();
    await expect(AssidePage.phone).toBeDisplayed();
    await expect(AssidePage.address).toBeDisplayed();
  });
});
