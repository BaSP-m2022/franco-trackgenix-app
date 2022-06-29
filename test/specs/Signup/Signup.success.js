const Signup = require('../../pageobjects/signup');

//(this will change with the Firebase setup)

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
