const EmployeeProfile = require('../../../pageobjects/employees/employees.profile');

beforeAll ('Open Browser', async () => {
  await EmployeeProfile.open();
});

describe('Employee should Edit Successfull Profile Interactions', () => {
  it('Employee should be edited whit a valid credentials', async () => {
    await EmployeeProfile.editProfile('Matias', 'Vadala', 'mativadala@gmail.com', '10/10/1998','12345678');
    await expect(EmployeeProfile.successfullyMessage).toBeDisplayed();
  });
  it ('Test modal text', async () => {
    const modalMsg =  await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('You have updated your profile successfully!');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Profile updated');
  })
  it ('If we click on Ok Button, this modal should be closed', async () =>{
    await expect(EmployeeProfile.successfullyMessagebutton).toBeClickable();
    await EmployeeProfile.successfullyMessagebutton.click();
    await expect(EmployeeProfile.successfullyMessage).not.toBeDisplayed();
  })
  it ('If we click on X Button, this modal should be closed', async () => {
    await EmployeeProfile.editProfile('Here', 'Wego', 'again@gmail.com', '10/10/1998','12345678');
    await expect(EmployeeProfile.successfullyMessage).toBeDisplayed();
    await expect(EmployeeProfile.successfullyMessageX).toBeClickable();
    await EmployeeProfile.successfullyMessageX.click();
    await expect(EmployeeProfile.successfullyMessage).not.toBeDisplayed();
  });
  it('Employee should edit password whit a valid credentials', async () => {
    await EmployeeProfile.changePassword('test1234', 'test12345', 'test12345');
    await expect(EmployeeProfile.successfullyMessage).toBeDisplayed();
    const modalMsg =  await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]/p');
    await expect(modalMsg).toHaveText('You have updated your password successfully!');
    const modalTitle = await $('//*[@id="root"]/div/div/div[2]/section/div/div/div[1]/h3');
    await expect(modalTitle).toHaveText('Password updated');
    await expect(EmployeeProfile.successfullyMessagebutton).toBeClickable();
    await EmployeeProfile.successfullyMessagebutton.click();
    await expect(EmployeeProfile.successfullyMessage).not.toBeDisplayed();
  })
});
