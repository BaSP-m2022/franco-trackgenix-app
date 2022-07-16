const Signup = require('../../pageobjects/signup');
const { name, lastname, randomDate, randomDni, randomEmail } = require('./Random.data');

beforeAll('Open Browser', () => {
  browser.url('https://franco-trackgenix-app.vercel.app/signup');
});

describe('Complete the signup inputs with valid data', () => {
  it('Edit an admin success', async () => {
    await Signup.signup(name, lastname, randomDate(), randomDni(), randomEmail(), 'test1234');
  });
});
