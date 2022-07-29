const Signup = require('../../pageobjects/signup');
const {
  name,
  lastname,
  dateToReturn,
  randomDni,
  randomEmail
} = require('../../pageobjects/Random.data');

describe('Complete the signup inputs with valid data', () => {
  it('Create an user', async () => {
    browser.fullscreenWindow();
    await Signup.open();
    await Signup.signup(name, lastname, dateToReturn, randomDni(), randomEmail(), 'test1234');
  });
});
