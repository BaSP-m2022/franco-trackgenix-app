const AdminList = require('../../pageobjects/admin.list');
const HeaderPage = require('../../pageobjects/header');
const AssidePage = require('../../pageobjects/asside');
const FooterPage = require('../../pageobjects/footer');

describe('Header/footer/asside on list page', () => {
  it('Header on list page', async () => {
    await AdminList.open();
    await expect(HeaderPage.rrLogo).toBeDisplayed();
    await expect(HeaderPage.edit).toBeClickable();
    await expect(HeaderPage.edit).toBeDisplayed();
  });
  it('Footer on list page', async () => {
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
  it('Aside on list page', async () => {
    await expect(AssidePage.menuAside).toBeDisplayed();
    await expect(AssidePage.contactUstext).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeClickable();
    await expect(AssidePage.homeRef).toHaveHref('/home');
    await expect(AssidePage.adminsRef).toBeDisplayed();
    await expect(AssidePage.adminsRef).toBeClickable();
    await expect(AssidePage.adminsRef).toHaveHref('/admins');
    await expect(AssidePage.superAdminsRef).toBeDisplayed();
    await expect(AssidePage.superAdminsRef).toBeClickable();
    await expect(AssidePage.superAdminsRef).toHaveHref('/super-admins');
    await expect(AssidePage.employeesRef).toBeDisplayed();
    await expect(AssidePage.employeesRef).toBeClickable();
    await expect(AssidePage.employeesRef).toHaveHref('/employees');
    await expect(AssidePage.projectsRef).toBeDisplayed();
    await expect(AssidePage.projectsRef).toBeClickable();
    await expect(AssidePage.projectsRef).toHaveHref('/projects');
    await expect(AssidePage.timesheetsRef).toBeDisplayed();
    await expect(AssidePage.timesheetsRef).toBeClickable();
    await expect(AssidePage.timesheetsRef).toHaveHref('/time-sheets');
    await expect(AssidePage.tasksRef).toBeDisplayed();
    await expect(AssidePage.tasksRef).toBeClickable();
    await expect(AssidePage.tasksRef).toHaveHref('/tasks');
    await expect(AssidePage.contact).toBeDisplayed();
    await expect(AssidePage.phone).toBeDisplayed();
    await expect(AssidePage.address).toBeDisplayed();
  });
});

describe('Header/footer/asside on form page', () => {
  it('Header on form page', async () => {
    await AdminList.addAdmin.click();
    await expect(HeaderPage.rrLogo).toBeDisplayed();
    await expect(HeaderPage.edit).toBeClickable();
    await expect(HeaderPage.edit).toBeDisplayed();
  });
  it('Footer on form page', async () => {
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
  it('Aside on form page', async () => {
    await expect(AssidePage.menuAside).toBeDisplayed();
    await expect(AssidePage.contactUstext).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeDisplayed();
    await expect(AssidePage.homeRef).toBeClickable();
    await expect(AssidePage.homeRef).toHaveHref('/admins/home');
    await expect(AssidePage.adminsRef).toBeDisplayed();
    await expect(AssidePage.adminsRef).toBeClickable();
    await expect(AssidePage.adminsRef).toHaveHref('/admins');
    await expect(AssidePage.superAdminsRef).toBeDisplayed();
    await expect(AssidePage.superAdminsRef).toBeClickable();
    await expect(AssidePage.superAdminsRef).toHaveHref('/super-admins');
    await expect(AssidePage.employeesRef).toBeDisplayed();
    await expect(AssidePage.employeesRef).toBeClickable();
    await expect(AssidePage.employeesRef).toHaveHref('/employees');
    await expect(AssidePage.projectsRef).toBeDisplayed();
    await expect(AssidePage.projectsRef).toBeClickable();
    await expect(AssidePage.projectsRef).toHaveHref('/projects');
    await expect(AssidePage.timesheetsRef).toBeDisplayed();
    await expect(AssidePage.timesheetsRef).toBeClickable();
    await expect(AssidePage.timesheetsRef).toHaveHref('/time-sheets');
    await expect(AssidePage.tasksRef).toBeDisplayed();
    await expect(AssidePage.tasksRef).toBeClickable();
    await expect(AssidePage.tasksRef).toHaveHref('/tasks');
    await expect(AssidePage.contact).toBeDisplayed();
    await expect(AssidePage.phone).toBeDisplayed();
    await expect(AssidePage.address).toBeDisplayed();
  });
});
