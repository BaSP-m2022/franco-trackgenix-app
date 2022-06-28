const Homepage = require('../../../pageobjects/home.page');
const SuperAdminList = require('../../../pageobjects/superadmin.list');
const SuperAdminForm = require('../../../pageobjects/superadmin.form');
const HeaderPage = require('../../../pageobjects/header');
const AssidePage = require('../../../pageobjects/asside');
const FooterPage = require('../../../pageobjects/footer');

describe('Super Admin list interactions', () => {
  it('Homepage should be deployed', async () => {
    await Homepage.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Super Admin main page should be deployed', async () => {
    await SuperAdminList.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/super-admins');

    await expect(SuperAdminList.searchInput).toBeDisplayed();
    await SuperAdminList.setSearchFirstName('Axel');
    await expect(SuperAdminList.superAdminTitle).toBeDisplayed();
    await expect(SuperAdminList.superAdminTitle).toHaveText('Super Admins');
    await expect(SuperAdminList.table).toBeDisplayed();
    await expect(SuperAdminList.tableHead).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1FirstName).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1LastName).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1Email).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1Id).toBeDisplayed();
  });
  it('Buttons clickables', async () => {
    await expect(SuperAdminList.superAdmin1EditButton).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1EditButton).toBeClickable;
    await expect(SuperAdminList.superAdmin1DeleteButton).toBeDisplayed();
    await expect(SuperAdminList.superAdmin1DeleteButton).toBeClickable;
    await expect(SuperAdminList.addSuperAdmin).toBeDisplayed();
    await expect(SuperAdminList.addSuperAdmin).toBeClickable;
  });
  it('Delete an Super Admin', async () => {
    await SuperAdminList.deleteSuperAdmin();
  });
});

describe('Edit Super Admin page interactions', () => {
  it('Elements displayed', async () => {
    await SuperAdminList.superAdmin1EditButton.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/super-admins/form');
    await expect(SuperAdminForm.formTitle).toBeDisplayed();
    await expect(SuperAdminForm.formTitle).toHaveText('Update Super Admin');
    await expect(SuperAdminForm.firstName).toBeDisplayed();
    await expect(SuperAdminForm.firstName).toHaveText('First name');
    await expect(SuperAdminForm.lastName).toBeDisplayed();
    await expect(SuperAdminForm.lastName).toHaveText('Last name');
    await expect(SuperAdminForm.email).toBeDisplayed();
    await expect(SuperAdminForm.email).toHaveText('Email');
    await expect(SuperAdminForm.password).toBeDisplayed();
    await expect(SuperAdminForm.password).toHaveText('Password');
    await expect(SuperAdminForm.returnButton).toBeDisplayed();
    await expect(SuperAdminForm.returnButton).toBeClickable();
    await expect(SuperAdminForm.saveButton).toBeDisplayed();
    await expect(SuperAdminForm.saveButton).toBeClickable();
  });
  it('Inputs enables', async () => {
    await expect(SuperAdminForm.firstNameInput).toBeEnabled();
    await expect(SuperAdminForm.lastnameInput).toBeEnabled();
    await expect(SuperAdminForm.emailInput).toBeEnabled();
    await expect(SuperAdminForm.passwordInput).toBeEnabled();
  });
  it('Edit an Super Admin success', async () => {
    await SuperAdminForm.updateSuperAdmin(
      'Test',
      'Fiol',
      'laurasammartino@hotmail.com',
      'qqqq1111'
    );
  });
  it('Wrong data inputs', async () => {
    await SuperAdminList.superAdmin1EditButton.click();
    await SuperAdminForm.updateSuperAdminFailed('1', '1', '1', '1');
    await expect(SuperAdminForm.firstNameMsg).toHaveText(
      'First Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.lastnameMsg).toHaveText(
      'Last Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.emailMsg).toHaveText('Your email must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      'Password must have between 8 and 12 characters'
    );
  });
  it('Just success First Name', async () => {
    await SuperAdminForm.updateSuperAdminFailed('Higinia', '1', '1', '1');
    await expect(SuperAdminForm.firstNameMsg).not.toHaveText();
    await expect(SuperAdminForm.lastnameMsg).toHaveText(
      'Last Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.emailMsg).toHaveText('Your email must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      'Password must have between 8 and 12 characters'
    );
  });
  it('Just success Last Name', async () => {
    await SuperAdminForm.updateSuperAdminFailed('1', 'Medica', '1', '1');
    await expect(SuperAdminForm.firstNameMsg).toHaveText(
      'First Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.lastnameMsg).not.toHaveText();
    await expect(SuperAdminForm.emailMsg).toHaveText('Your email must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      'Password must have between 8 and 12 characters'
    );
  });
  it('Just success Email', async () => {
    await SuperAdminForm.updateSuperAdminFailed('1', '1', 'higinia@gmail.com', '1');
    await expect(SuperAdminForm.firstNameMsg).toHaveText(
      'First Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.lastnameMsg).toHaveText(
      'Last Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.emailMsg).not.toHaveText();
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      'Password must have between 8 and 12 characters'
    );
  });
  it('Just success password', async () => {
    await SuperAdminForm.updateSuperAdminFailed('1', '1', '1', 'hola1111');
    await expect(SuperAdminForm.firstNameMsg).toHaveText(
      'First Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.lastnameMsg).toHaveText(
      'Last Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.emailMsg).toHaveText('Your email must be a valid email');
    await expect(SuperAdminForm.passwordMsg).not.toHaveText();
  });
  it('Long failed password', async () => {
    await SuperAdminForm.updateSuperAdminFailed('1', '1', '1', 'hola11111111111111111');
    await expect(SuperAdminForm.firstNameMsg).toHaveText(
      'First Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.lastnameMsg).toHaveText(
      'Last Name must have at least 3 characters'
    );
    await expect(SuperAdminForm.emailMsg).toHaveText('Your email must be a valid email');
    await expect(SuperAdminForm.passwordMsg).toHaveText(
      'Password must have between 8 and 12 characters'
    );
  });
  it('empty inputs', async () => {
    await SuperAdminForm.open();
    await SuperAdminForm.updateSuperAdminFailed();
    await expect(SuperAdminForm.firstNameMsg).toHaveText('"firstName" is not allowed to be empty');
    await expect(SuperAdminForm.lastnameMsg).toHaveText('"lastName" is not allowed to be empty');
    await expect(SuperAdminForm.emailMsg).toHaveText('"email" is not allowed to be empty');
    await expect(SuperAdminForm.passwordMsg).toHaveText('"password" is not allowed to be empty');
    await SuperAdminForm.returnButton.click();
  });
});

describe('Add superAdmin page interactions', () => {
  it('Elements displayed', async () => {
    await SuperAdminForm.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/super-admins/form');
    await expect(SuperAdminForm.formTitle).toBeDisplayed();
    await expect(SuperAdminForm.formTitle).toHaveText('Add Super Admin');
    await expect(SuperAdminForm.firstName).toBeDisplayed();
    await expect(SuperAdminForm.firstName).toHaveText('First name');
    await expect(SuperAdminForm.lastName).toBeDisplayed();
    await expect(SuperAdminForm.lastName).toHaveText('Last name');
    await expect(SuperAdminForm.email).toBeDisplayed();
    await expect(SuperAdminForm.email).toHaveText('Email');
    await expect(SuperAdminForm.password).toBeDisplayed();
    await expect(SuperAdminForm.password).toHaveText('Password');
    await expect(SuperAdminForm.returnButton).toBeDisplayed();
    await expect(SuperAdminForm.returnButton).toBeClickable();
    await expect(SuperAdminForm.saveButton).toBeDisplayed();
    await expect(SuperAdminForm.saveButton).toBeClickable();
  });
  it('Inputs enables', async () => {
    await expect(SuperAdminForm.firstNameInput).toBeEnabled();
    await expect(SuperAdminForm.lastnameInput).toBeEnabled();
    await expect(SuperAdminForm.emailInput).toBeEnabled();
    await expect(SuperAdminForm.passwordInput).toBeEnabled();
  });
  it('Add an superAdmin success', async () => {
    await SuperAdminForm.addSuperAdmin('Axel', 'Fiol', 'axel.fiol97@gmail.com', 'qqqq1111');
  });
});
describe('Header/footer/asside on list page', () => {
  it('Header on list page', async () => {
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
    await SuperAdminForm.open();
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
    await expect(AssidePage.homeRef).toHaveHref('/super-admins/home');
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
