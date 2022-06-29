const Signup = require('../../pageobjects/signup');

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
