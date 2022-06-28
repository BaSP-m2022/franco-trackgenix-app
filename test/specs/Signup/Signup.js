const Signup = require('../../pageobjects/signup');
const HeaderPage = require('../../pageobjects/header');
const AssidePage = require('../../pageobjects/asside');
const FooterPage = require('../../pageobjects/footer');

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

// describe('Complete the signup inputs with valid data', () => {
//   it('Edit an admin success', async () => {
//     await Signup.signup(
//       'Laura',
//       'Sammartino',
//       '10/06/1990',
//       '12345678',
//       'laurasammartino@hotmail.com',
//       'qqqq1111'
//     );
//   });
// });

describe('Complete the signup inputs with invalid data', () => {
  it('Wrong data inputs', async () => {
    await Signup.open();
    await Signup.signupFailed('1', '1', '1', '1', '1', '1');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have at least 3 characters');
    await expect(Signup.lastNameMsg).toHaveText('Last Name must have at least 3 characters');
    await expect(Signup.dobMsg).toHaveText('"dateOfBirth" must be a valid date');
    await expect(Signup.dniMsg).toHaveText('DNI must have between 7 and 8 characters');
    await expect(Signup.emailMsg).toHaveText('Your email must be a valid email');
    await expect(Signup.passwordMsg).toHaveText('Password must have between 8 and 12 characters');
  });
  it('Just success First Name', async () => {
    await Signup.signupFailed('Higinia', '1', '10/10/2020', '1', '1', '1');
    await expect(Signup.firstNameMsg).not.toHaveText();
    await expect(Signup.lastNameMsg).toHaveText('Last Name must have at least 3 characters');
    await expect(Signup.dobMsg).toHaveText('You must be more than 18 years old');
    await expect(Signup.dniMsg).toHaveText('DNI must have between 7 and 8 characters');
    await expect(Signup.emailMsg).toHaveText('Your email must be a valid email');
    await expect(Signup.passwordMsg).toHaveText('Password must have between 8 and 12 characters');
  });
  it('Just success Last Name', async () => {
    await Signup.signupFailed('1', 'Medica', '10/10/2025', '1', '1', '1');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have at least 3 characters');
    await expect(Signup.lastNameMsg).not.toHaveText();
    await expect(Signup.dobMsg).toHaveText('You must be more than 18 years old');
    await expect(Signup.dniMsg).toHaveText('DNI must have between 7 and 8 characters');
    await expect(Signup.emailMsg).toHaveText('Your email must be a valid email');
    await expect(Signup.passwordMsg).toHaveText('Password must have between 8 and 12 characters');
  });
  it('Just success date of birth', async () => {
    await Signup.signupFailed('1', '1', '15/03/1991', '1', '1', '1');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have at least 3 characters');
    await expect(Signup.lastNameMsg).toHaveText('Last Name must have at least 3 characters');
    await expect(Signup.dobMsg).not.toHaveText();
    await expect(Signup.dniMsg).toHaveText('DNI must have between 7 and 8 characters');
    await expect(Signup.emailMsg).toHaveText('Your email must be a valid email');
    await expect(Signup.passwordMsg).toHaveText('Password must have between 8 and 12 characters');
  });
  it('Just success DNI', async () => {
    await Signup.signupFailed('1', '1', '10/10/2025', '1', '12345678', '1');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have at least 3 characters');
    await expect(Signup.lastNameMsg).toHaveText('Last Name must have at least 3 characters');
    await expect(Signup.dobMsg).toHaveText('You must be more than 18 years old');
    await expect(Signup.dniMsg).not.toHaveText();
    await expect(Signup.emailMsg).toHaveText('Your email must be a valid email');
    await expect(Signup.passwordMsg).toHaveText('Password must have between 8 and 12 characters');
  });
  it('Just success Email', async () => {
    await Signup.signupFailed('1', '1', '15/03/2020', '123', 'higinia@gmail.com', '1');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have at least 3 characters');
    await expect(Signup.lastNameMsg).toHaveText('Last Name must have at least 3 characters');
    await expect(Signup.dobMsg).toHaveText('You must be more than 18 years old');
    await expect(Signup.dniMsg).toHaveText('DNI must have between 7 and 8 characters');
    await expect(Signup.emailMsg).not.toHaveText();
    await expect(Signup.passwordMsg).toHaveText('Password must have between 8 and 12 characters');
  });
  it('Just success password', async () => {
    await Signup.signupFailed('1', '1', '1', '1', '123456789', 'hola1111');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have at least 3 characters');
    await expect(Signup.lastNameMsg).toHaveText('Last Name must have at least 3 characters');
    await expect(Signup.dobMsg).toHaveText('You must be more than 18 years old');
    await expect(Signup.dniMsg).toHaveText('DNI must have between 7 and 8 characters');
    await expect(Signup.emailMsg).toHaveText('Your email must be a valid email');
    await expect(Signup.passwordMsg).not.toHaveText();
  });
  it('Failed password without letters', async () => {
    await Signup.signupFailed('1', '1', '1', '1', '123456789', '111111111');
    await expect(Signup.firstNameMsg).toHaveText('First Name must have at least 3 characters');
    await expect(Signup.lastNameMsg).toHaveText('Last Name must have at least 3 characters');
    await expect(Signup.dobMsg).toHaveText('You must be more than 18 years old');
    await expect(Signup.dniMsg).toHaveText('DNI must have between 7 and 8 characters');
    await expect(Signup.emailMsg).toHaveText('Your email must be a valid email');
    await expect(Signup.passwordMsg).toHaveText('Password must have at least 1 letter');
  });
  it('empty inputs', async () => {
    await Signup.open();
    await Signup.signupFailed('', '', '', '', '', '');
    await expect(Signup.firstNameMsg).toHaveText('"firstName" is not allowed to be empty');
    await expect(Signup.lastNameMsg).toHaveText('"lastName" is not allowed to be empty');
    await expect(Signup.dobMsg).toHaveText('"dateOfBirth" must be a valid date');
    await expect(Signup.dniMsg).toHaveText('"dni" is not allowed to be empty');
    await expect(Signup.emailMsg).toHaveText('"email" is not allowed to be empty');
    await expect(Signup.passwordMsg).toHaveText('"password" is not allowed to be empty');
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
    await expect(AssidePage.homeRef).toHaveHref('/employee/home');
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
