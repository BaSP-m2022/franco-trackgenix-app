const Signup = require('../../pageobjects/signup');

describe('Signup page interactions', () => {
  it('Elements displayed and enabled on the table', async () => {
    browser.fullscreenWindow();
    await Signup.open();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/signup');
    await expect(Signup.formTitle).toBeDisplayed();
    await expect(Signup.formTitle).toHaveText('Sign Up');
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
    browser.fullscreenWindow();
    await expect(Signup.returnButton).toBeDisplayed();
    await expect(Signup.returnButton).toBeClickable;
    await expect(Signup.signUpButton).toBeDisplayed();
    await expect(Signup.signUpButton).toBeClickable;
    await expect(Signup.logInButton).toBeDisplayed();
    await expect(Signup.logInButton).toBeClickable;
  });
});
