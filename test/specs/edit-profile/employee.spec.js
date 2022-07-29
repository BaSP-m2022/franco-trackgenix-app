const LoginPage = require('../../pageobjects/login/login.page');
const Edit = require('../../pageobjects/edit-profile/edit');
const { name, lastname, dateToReturn, randomDni } = require('../randomizer');

beforeAll('Open Browser', () => {
  LoginPage.open();
  LoginPage.login('eee@gmail.com', 'test1234');
});

describe('edit user profile', () => {
  it('open', async () => {
    const profile = await $('//*[@id="root"]/div/header/div[2]/button[1]');
    await expect(profile).toBeClickable();
    await profile.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employee/profile');
  });
  it('check user data have changed', async () => {
    await browser.fullscreenWindow();
    const data1 = await Edit.inputName.getValue();
    console.log(data1);
    const data2 = await Edit.inputLastName.getValue();
    const data3 = await Edit.inputDate.getValue();
    const data4 = await Edit.inputDni.getValue();
    await browser.pause(500); //eslint-disable-line
    await Edit.updateUser(name, lastname, dateToReturn, randomDni());
    const data5 = await $(
      '//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[1]/input'
    ).getValue();
    const data6 = await Edit.inputLastName.getValue();
    const data7 = await Edit.inputDate.getValue();
    const data8 = await Edit.inputDni.getValue();
    const modalSuccess = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]');
    const okButton = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]/div/button');
    const successMessage = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]/p');
    await expect(modalSuccess).toBeDisplayed();
    await expect(successMessage).toHaveText('You have updated your profile successfully!');
    await expect(okButton).toBeClickable();
    await okButton.click();
    await browser.pause(1000); //eslint-disable-line
    let comparation = false;
    if (data1 !== data5 && data2 !== data6 && data3 !== data7 && data4 !== data8) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
  it('change password', async () => {
    await browser.pause(500);//eslint-disable-line
    await Edit.updatePassword('admin123', 'admin123');
    const modalSuccess = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]');
    const okButton = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]/div/button');
    const successMessage = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]/p');
    await expect(modalSuccess).toBeDisplayed();
    await expect(successMessage).toHaveText('You have updated your password successfully!');
    await browser.pause(500);//eslint-disable-line
    await expect(okButton).toBeClickable();
    await okButton.click();
  });
});
