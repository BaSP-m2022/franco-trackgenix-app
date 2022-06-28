const Signup = require('../pageobjects/signup');
const HeaderPage = require('../pageobjects/header');
const AssidePage = require('../pageobjects/asside');
const FooterPage = require('../pageobjects/footer');

describe('Signup page interactions', () => {
  it('Elements displayed and enabled on the table', async () => {
    await Signup.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employee/signup');
    await expect(Signup.formTitle).toBeDisplayed();
    await expect(Signup.formTitle).toHaveText('Employee Sign Up');
    await expect(Signup.table).toBeDisplayed();
    await expect(Signup.firstNameTitleInput).toBeDisplayed();
    await expect(Signup.firstNameTitleInput).toHaveText('First Name');
    await expect(Signup.firstNameInput).toBeDisplayed();
    await expect(Signup.firstNameInput).toBeEnabled();
    await expect(Signup.lastNameTitleInput).toBeDisplayed();
    await expect(Signup.lastNameTitleInput).toHaveText('Last Name');
    await expect(Signup.lastNameInput).toBeDisplayed();
    await expect(Signup.lastNameInput).toBeEnabled();
    await expect(Signup.dobTitleInput).toBeDisplayed();
    await expect(Signup.dobTitleInput).toHaveText('Date Of Birth');
    await expect(Signup.dobInput).toBeDisplayed();
    await expect(Signup.dobInput).toBeEnabled();
    await expect(Signup.dniTitleInput).toBeDisplayed();
    await expect(Signup.dniTitleInput).toHaveText('DNI');
    await expect(Signup.dniInput).toBeDisplayed();
    await expect(Signup.dniInput).toBeEnabled();
    await expect(Signup.emailTitleInput).toBeDisplayed();
    await expect(Signup.emailTitleInput).toHaveText('Email');
    await expect(Signup.emailInput).toBeDisplayed();
    await expect(Signup.emailInput).toBeEnabled();
    await expect(Signup.passTitleInput).toBeDisplayed();
    await expect(Signup.passTitleInput).toHaveText('Password');
    await expect(Signup.passInput).toBeDisplayed();
    await expect(Signup.passInput).toBeEnabled();
  });
  it('Buttons clickables', async () => {
    await expect(Signup.returnButton).toBeDisplayed();
    await expect(Signup.returnButton).toBeClickable;
    await expect(Signup.signUpButton).toBeDisplayed();
    await expect(Signup.signUpButton).toBeClickable;
    await expect(Signup.logInButton).toBeDisplayed();
    await expect(Signup.logInButton).toBeClickable;
  });
});

describe('Complete the signup inputs with valid data', () => {
  it('Edit an admin success', async () => {
    await Signup.signup(
      'Laura',
      'Sammartino',
      '10/06/1990',
      '12345678',
      'laurasammartino@hotmail.com',
      'qqqq1111'
    );
  });
});

describe('Complete the signup inputs with invalid data', () => {
  it('Wrong data inputs', async () => {
    await Signup.open();
    await Signup.signup('1', '1', '1', '1', '1', '1');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(Signup.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(Signup.dobMsg).toHaveText('');
    await expect(Signup.dniMsg).toHaveText('');
    await expect(Signup.emailMsg).toHaveText('"email" must be a valid email');
    await expect(Signup.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success First Name', async () => {
    await Signup.updateAdminFailed('Higinia', '1', '1', '1');
    await expect(Signup.firstNameMsg).not.toHaveText();
    await expect(Signup.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(Signup.emailMsg).toHaveText('"email" must be a valid email');
    await expect(Signup.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success Last Name', async () => {
    await Signup.updateAdminFailed('1', 'Medica', '1', '1');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(Signup.lastnameMsg).not.toHaveText();
    await expect(Signup.emailMsg).toHaveText('"email" must be a valid email');
    await expect(Signup.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success Email', async () => {
    await Signup.updateAdminFailed('1', '1', 'higinia@gmail.com', '1');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(Signup.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(Signup.emailMsg).not.toHaveText();
    await expect(Signup.passwordMsg).toHaveText(
      '"password" length must be at least 8 characters long'
    );
  });
  it('Just success password', async () => {
    await Signup.updateAdminFailed('1', '1', '1', 'hola1111');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(Signup.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(Signup.emailMsg).toHaveText('"email" must be a valid email');
    await expect(Signup.passwordMsg).not.toHaveText();
  });
  it('Long failed password', async () => {
    await Signup.updateAdminFailed('1', '1', '1', 'hola11111111111111111');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have only letters');
    await expect(Signup.lastnameMsg).toHaveText('Last Name must have only letters');
    await expect(Signup.emailMsg).toHaveText('"email" must be a valid email');
    await expect(Signup.passwordMsg).toHaveText(
      '"password" length must be less than or equal to 12 characters long'
    );
  });
  it('empty inputs', async () => {
    await Signup.open();
    await Signup.signup('', '', '', '', '', '');
    await expect(Signup.firstNameMsg).toHaveText('');
    await expect(Signup.lastnameMsg).toHaveText('');
    await expect(Signup.dobMsg).toHaveText('');
    await expect(Signup.dniMsg).toHaveText('');
    await expect(Signup.emailMsg).toHaveText('');
    await expect(Signup.passwordMsg).toHaveText('');
  });
});

describe('Header/footer/asside on Signup page', () => {
  it('Header on Signup page', async () => {
    await Signup.open();
    await expect(HeaderPage.rrLogo).toBeDisplayed();
    await expect(HeaderPage.edit).toBeClickable();
    await expect(HeaderPage.edit).toBeDisplayed();
  });
  it('Footer on Signup page', async () => {
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
