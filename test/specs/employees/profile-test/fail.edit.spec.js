const EmployeeProfile = require('../../../pageobjects/employees/employees.profile');

beforeAll('Open Browser', async () => {
  await EmployeeProfile.open();
});
afterEach('Refresh page', async () => {
  await EmployeeProfile.open();
});

describe('test all fails posibilities of fail edits', () => {
  it('If we put less data of Profile inputs require it is should display error', async () => {
    await EmployeeProfile.editProfile('a', 'a', 'a', '99/99/9999', '1');
    const error1 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[1]/p');
    await expect(error1).toBeDisplayed();
    await expect(error1).toHaveText('First Name must have at least 3 characters');
    const error2 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[2]/p');
    await expect(error2).toBeDisplayed();
    await expect(error2).toHaveText('Last Name must have at least 3 characters');
    const error3 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[3]/p');
    await expect(error3).toBeDisplayed();
    await expect(error3).toHaveText('Your email must be a valid email');
    const error4 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[4]/p');
    await expect(error4).toBeDisplayed();
    await expect(error4).toHaveText('You must be more than 18 years old');
    const error5 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[5]/p');
    await expect(error5).toBeDisplayed();
    await expect(error5).toHaveText('DNI must have between 7 and 8 characters');
  });
  it('If we put numbers on names of Profile inputs, other error should be displayed', async () => {
    await EmployeeProfile.editProfile('asd1231', 'asdd1456', 'a', '99/99/9999', '1');
    const error1 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[1]/p');
    await expect(error1).toBeDisplayed();
    await expect(error1).toHaveText('First Name must have only letters');
    const error2 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[2]/p');
    await expect(error2).toBeDisplayed();
    await expect(error2).toHaveText('Last Name must have only letters');
  });
  it('If we do not complete any Profile inputs of the form, we should see other erros', async () => {
    await EmployeeProfile.clearValues();
    await expect(EmployeeProfile.editButton).toBeDisplayed();
    await expect(EmployeeProfile.editButton).toBeClickable();
    await EmployeeProfile.editButton.click();
    const error1 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[1]/p');
    await expect(error1).toBeDisplayed();
    await expect(error1).toHaveText('"firstName" is not allowed to be empty');
    const error2 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[2]/p');
    await expect(error2).toBeDisplayed();
    await expect(error2).toHaveText('"lastName" is not allowed to be empty');
    const error3 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[3]/p');
    await expect(error3).toBeDisplayed();
    await expect(error3).toHaveText('"email" is not allowed to be empty');
    const error4 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[4]/p');
    await expect(error4).toBeDisplayed();
    await expect(error4).toHaveText('"dateOfBirth" must be a valid date');
    const error5 = await $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[5]/p');
    await expect(error5).toBeDisplayed();
    await expect(error5).toHaveText('"dni" is not allowed to be empty');
  });
  it('If we put invalid password, error should be displayed', async () => {
    await EmployeeProfile.changePassword('wrongpass123', 'test12345', 'test12345');
    const error1 = await $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[1]/p');
    await expect(error1).toBeDisplayed();
    await expect(error1).toHaveText('Password is incorrect');
  });
  it('Password need numbers and characters', async () => {
    await EmployeeProfile.changePassword('aaaapasnd', 'notpassword', 'notpasswordhere');
    const error1 = await $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[1]/p');
    await expect(error1).toBeDisplayed();
    await expect(error1).toHaveText('Password must have at least 1 number');
    const error2 = await $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[2]/p');
    await expect(error2).toBeDisplayed();
    await expect(error2).toHaveText('Password must have at least 1 number');
  });
  it('Password match verify', async () => {
    await EmployeeProfile.changePassword('passwordnd1', 'notpassword', 'notmach');
    const error3 = await $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[3]/p');
    await expect(error3).toBeDisplayed();
    await expect(error3).toHaveText('Passwords must match');
  });
});
