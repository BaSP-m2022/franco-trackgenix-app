const Signup = require('../../pageobjects/signup');
const { name, lastname, dateToReturn, randomDni, randomEmail } = require('./Random.data');

beforeAll('Open Browser', () => {
  browser.url('https://franco-trackgenix-app.vercel.app/signup');
});

describe('Complete the signup inputs with valid data', () => {
  it('Create a user', async () => {
    await Signup.signup(name, lastname, dateToReturn, randomDni(), randomEmail(), 'test1234');
  });
});
