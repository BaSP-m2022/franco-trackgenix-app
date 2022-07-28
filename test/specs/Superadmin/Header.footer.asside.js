const SuperAdminList = require('../../pageobjects/superadmin.list');
const SuperAdminForm = require('../../pageobjects/superadmin.form');
const HeaderPage = require('../../pageobjects/header');
const AssidePage = require('../../pageobjects/asside');
const FooterPage = require('../../pageobjects/footer');
const Homepage = require('../../pageobjects/home.page');

describe('Header/footer/asside on list page', () => {
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
  it('Footer on list page', async () => {
    browser.fullscreenWindow();
    await expect(FooterPage.locationText).toBeDisplayed();
    await expect(FooterPage.copyText).toBeDisplayed();
    await expect(FooterPage.linkedInIcon).toBeDisplayed();
    await expect(FooterPage.linkedInIcon).toBeClickable();
    await expect(FooterPage.linkedInIcon).toHaveHref(
      'https://www.linkedin.com/company/radium-rocket/'
    );
    await expect(FooterPage.twiterIcon).toBeDisplayed();
    await expect(FooterPage.twiterIcon).toBeClickable();
    await expect(FooterPage.twiterIcon).toHaveHref('https://twitter.com/radiumrocket');
    await expect(FooterPage.facebookIcon).toBeDisplayed();
    await expect(FooterPage.facebookIcon).toBeClickable();
    await expect(FooterPage.facebookIcon).toHaveHref('https://www.facebook.com/radiumrocket');
    await expect(FooterPage.instagramIcon).toBeDisplayed();
    await expect(FooterPage.instagramIcon).toBeClickable();
    await expect(FooterPage.instagramIcon).toHaveHref('https://www.instagram.com/radium.rocket/');
    await expect(FooterPage.githubIcon).toBeDisplayed();
    await expect(FooterPage.githubIcon).toBeClickable();
    await expect(FooterPage.githubIcon).toHaveHref('https://github.com/radiumrocketapps');
  });
  it('Aside on Signup page', async () => {
    browser.fullscreenWindow();
    await expect(AssidePage.menuAside).toBeDisplayed();
    await expect(AssidePage.contactUstext).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeClickable();
    await expect(AssidePage.homeRef).toHaveHref('/admins');
    await expect(AssidePage.contact).toBeDisplayed();
    await expect(AssidePage.phone).toBeDisplayed();
    await expect(AssidePage.address).toBeDisplayed();
  });
});

describe('Header/footer/asside on form page', () => {
  it('Header on form page', async () => {
    browser.fullscreenWindow();
    await SuperAdminForm.open();
    await expect(HeaderPage.rrLogo).toBeDisplayed();
    await expect(HeaderPage.edit).toBeClickable();
    await expect(HeaderPage.edit).toBeDisplayed();
  });
  it('Footer on form page', async () => {
    browser.fullscreenWindow();
    await expect(FooterPage.locationText).toBeDisplayed();
    await expect(FooterPage.copyText).toBeDisplayed();
    await expect(FooterPage.linkedInIcon).toBeDisplayed();
    await expect(FooterPage.linkedInIcon).toBeClickable();
    await expect(FooterPage.linkedInIcon).toHaveHref(
      'https://www.linkedin.com/company/radium-rocket/'
    );
    await expect(FooterPage.twiterIcon).toBeDisplayed();
    await expect(FooterPage.twiterIcon).toBeClickable();
    await expect(FooterPage.twiterIcon).toHaveHref('https://twitter.com/radiumrocket');
    await expect(FooterPage.facebookIcon).toBeDisplayed();
    await expect(FooterPage.facebookIcon).toBeClickable();
    await expect(FooterPage.facebookIcon).toHaveHref('https://www.facebook.com/radiumrocket');
    await expect(FooterPage.instagramIcon).toBeDisplayed();
    await expect(FooterPage.instagramIcon).toBeClickable();
    await expect(FooterPage.instagramIcon).toHaveHref('https://www.instagram.com/radium.rocket/');
    await expect(FooterPage.githubIcon).toBeDisplayed();
    await expect(FooterPage.githubIcon).toBeClickable();
    await expect(FooterPage.githubIcon).toHaveHref('https://github.com/radiumrocketapps');
  });
  it('Aside on Signup page', async () => {
    browser.fullscreenWindow();
    await expect(AssidePage.menuAside).toBeDisplayed();
    await expect(AssidePage.contactUstext).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeClickable();
    await expect(AssidePage.homeRef).toHaveHref('/admins');
    await expect(AssidePage.contact).toBeDisplayed();
    await expect(AssidePage.phone).toBeDisplayed();
    await expect(AssidePage.address).toBeDisplayed();
  });
});
