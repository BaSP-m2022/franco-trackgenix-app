const LoginPage = require('../../pageobjects/login/login.page');
const Edit = require('../../pageobjects/edit-profile/edit');
const { name, lastname } = require('../randomizer');

beforeAll('Open Browser', () => {
  LoginPage.open();
  LoginPage.login('admin@gmail.com', 'admin123');
});

describe('edit user profile', () => {
  it('open', async () => {
    const profile = await $('//*[@id="root"]/div/header/div[2]/button[1]');
    await expect(profile).toBeClickable();
    await profile.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/admin/profile');
  });
  it('edit admin profile', async () => {
    await browser.fullscreenWindow();
    const data1 = await Edit.inputName.getValue();
    console.log(data1);
    const data2 = await Edit.inputLastName.getValue();
    await browser.pause(500);//eslint-disable-line
    await Edit.updateAdmin(name, lastname);
    const data5 = await $(
      '//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[1]/input'
    ).getValue();
    const data6 = await Edit.inputLastName.getValue();
    const modalSuccess = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]');
    const okButton = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]/div/button');
    const successMessage = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]/p');
    await expect(modalSuccess).toBeDisplayed();
    await expect(successMessage).toHaveText('You have updated your profile successfully!');
    await expect(okButton).toBeClickable();
    await okButton.click();
    await browser.pause(1000); //eslint-disable-line
    let comparation = false;
    if (data1 !== data5 && data2 !== data6) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
});
