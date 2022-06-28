const Homepage = require('../pageobjects/home.page');
const AdminList = require('../pageobjects/admin.list');
const AdminForm = require('../pageobjects/admin.form');
const HeaderPage = require('../pageobjects/header');
const AssidePage = require('../pageobjects/asside');
const FooterPage = require('../pageobjects/footer');

describe('Home page interactions', () => {
  it('Homepage should be deployed', async () => {
    await Homepage.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/home');
  });
  it('Admin main page should be deployed', async () => {
    await AdminList.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins');

    await expect(AdminList.searchInput).toBeDisplayed();
    await AdminList.setSearchFirstName('Laura');
    await expect(AdminList.adminTitle).toBeDisplayed();
    await expect(AdminList.table).toBeDisplayed();
    await expect(AdminList.tableHead).toBeDisplayed();
    await expect(AdminList.admin1FirstName).toBeDisplayed();
    await expect(AdminList.admin1LastName).toBeDisplayed();
    await expect(AdminList.admin1Email).toBeDisplayed();
    await expect(AdminList.admin1Id).toBeDisplayed();
  });
  it('Buttons clickables', async () => {
    await expect(AdminList.admin1EditButton).toBeDisplayed();
    await expect(AdminList.admin1EditButton).toBeClickable;
    await expect(AdminList.admin1DeleteButton).toBeDisplayed();
    await expect(AdminList.admin1DeleteButton).toBeClickable;
    await expect(AdminList.addAdmin).toBeDisplayed();
    await expect(AdminList.addAdmin).toBeClickable;
  });
  it('Delete an admin', async () => {
    await AdminList.deleteAdmin();
  });
});

describe('Edit admin page interactions', () => {
  it('Elements displayed', async () => {
    await AdminList.admin1EditButton.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins/form');
    await expect(AdminForm.formTitle).toBeDisplayed();
    await expect(AdminForm.formTitle).toHaveText('Update Admin');
    await expect(AdminForm.firstName).toBeDisplayed();
    await expect(AdminForm.firstName).toHaveText('First name');
    await expect(AdminForm.lastName).toBeDisplayed();
    await expect(AdminForm.lastName).toHaveText('Last name');
    await expect(AdminForm.email).toBeDisplayed();
    await expect(AdminForm.email).toHaveText('Email');
    await expect(AdminForm.password).toBeDisplayed();
    await expect(AdminForm.password).toHaveText('Password');
    await expect(AdminForm.returnButton).toBeDisplayed();
    await expect(AdminForm.returnButton).toBeClickable();
    await expect(AdminForm.saveButton).toBeDisplayed();
    await expect(AdminForm.saveButton).toBeClickable();
  });
  it('Inputs enables', async () => {
    await expect(AdminForm.firstNameInput).toBeEnabled();
    await expect(AdminForm.lastnameInput).toBeEnabled();
    await expect(AdminForm.emailInput).toBeEnabled();
    await expect(AdminForm.passwordInput).toBeEnabled();
  });
  it('Edit an admin success', async () => {
    await AdminForm.updateAdmin('Laura', 'Sammartino', 'laurasammartino@hotmail.com', 'qqqq1111');
  });
  it('wrong data inputs', async () => {
    await AdminList.admin1EditButton.click();
    await AdminForm.updateAdminFailed('1', '1', '1', '1');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success First Name', async () => {
    await AdminForm.updateAdminFailed('Higinia', '1', '1', '1');
    await expect(AdminForm.firstNameMsg).not.toHaveText();
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success Last Name', async () => {
    await AdminForm.updateAdminFailed('1', 'Medica', '1', '1');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).not.toHaveText();
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success Email', async () => {
    await AdminForm.updateAdminFailed('1', '1', 'higinia@gmail.com', '1');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).not.toHaveText();
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success password', async () => {
    await AdminForm.updateAdminFailed('1', '1', '1', 'hola1111');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).not.toHaveText();
  });
  it('Long failed password', async () => {
    await AdminForm.updateAdminFailed('1', '1', '1', 'hola11111111111111111');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" length must be less than or equal to 12 characters long'
    );
  });
  it('Failed password', async () => {
    await AdminForm.updateAdminFailed('1', '1', '1', 'aaaaaaaa');
    await expect(AdminForm.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(AdminForm.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(AdminForm.emailMsg).toHaveText('"email" must be a valid email');
    await expect(AdminForm.passwordMsg).toHaveText(
      '"password" with value "aaaaaaaa" fails to match the required pattern: /[0-9]/'
    );
  });
  it('empty inputs', async () => {
    await AdminForm.open();
    await AdminForm.updateAdminFailed();
    await expect(AdminForm.firstNameMsg).toHaveText('"firstName" is not allowed to be empty');
    await expect(AdminForm.lastnameMsg).toHaveText('"lastName" is not allowed to be empty');
    await expect(AdminForm.emailMsg).toHaveText('"email" is not allowed to be empty');
    await expect(AdminForm.passwordMsg).toHaveText('"password" is not allowed to be empty');
    await AdminForm.returnButton.click();
  });
});

describe('Add admin page interactions', () => {
  it('Elements displayed', async () => {
    await AdminList.addAdmin.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admins/form');
    await expect(AdminForm.formTitle).toBeDisplayed();
    await expect(AdminForm.formTitle).toHaveText('Add Admin');
    await expect(AdminForm.firstName).toBeDisplayed();
    await expect(AdminForm.firstName).toHaveText('First name');
    await expect(AdminForm.lastName).toBeDisplayed();
    await expect(AdminForm.lastName).toHaveText('Last name');
    await expect(AdminForm.email).toBeDisplayed();
    await expect(AdminForm.email).toHaveText('Email');
    await expect(AdminForm.password).toBeDisplayed();
    await expect(AdminForm.password).toHaveText('Password');
    await expect(AdminForm.returnButton).toBeDisplayed();
    await expect(AdminForm.returnButton).toBeClickable();
    await expect(AdminForm.saveButton).toBeDisplayed();
    await expect(AdminForm.saveButton).toBeClickable();
  });
  it('Inputs enables', async () => {
    await expect(AdminForm.firstNameInput).toBeEnabled();
    await expect(AdminForm.lastnameInput).toBeEnabled();
    await expect(AdminForm.emailInput).toBeEnabled();
    await expect(AdminForm.passwordInput).toBeEnabled();
  });
  it('Add an admin success', async () => {
    await AdminForm.addAdmin('Laura', 'Sammartino', 'laurasammartino@hotmail.com', 'qqqq1111');
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
    await AdminList.addAdmin.click();
    await expect(HeaderPage.rrLogo).toBeDisplayed();
    await expect(HeaderPage.edit).toBeClickable();
    await expect(HeaderPage.edit).toBeDisplayed();
  });
});
