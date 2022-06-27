const EmployeeProfile = require('../../../pageobjects/employees/employees.profile');

beforeAll('Open Browser', async () => {
  await EmployeeProfile.open();
});
// afterEach('Refresh page', async () => {
//   await EmployeeProfile.open();
// });

describe('Test page interactions', () => {
  it('Test all labels', async () => {
    await expect(EmployeeProfile.firstName).toBeDisplayed();
    await expect(EmployeeProfile.firstName).toHaveText('First name');
    await expect(EmployeeProfile.lastName).toBeDisplayed();
    await expect(EmployeeProfile.lastName).toHaveText('Last name');
    await expect(EmployeeProfile.email).toBeDisplayed();
    await expect(EmployeeProfile.email).toHaveText('Email');
    await expect(EmployeeProfile.dateOfBirth).toBeDisplayed();
    await expect(EmployeeProfile.dateOfBirth).toHaveText('Date of birth');
    await expect(EmployeeProfile.dni).toBeDisplayed();
    await expect(EmployeeProfile.dni).toHaveText('DNI');
    await expect(EmployeeProfile.oldPassword).toBeDisplayed();
    await expect(EmployeeProfile.oldPassword).toHaveText('Old password');
    await expect(EmployeeProfile.newPassword).toBeDisplayed();
    await expect(EmployeeProfile.newPassword).toHaveText('New password');
    await expect(EmployeeProfile.repeatPassword).toBeDisplayed();
    await expect(EmployeeProfile.repeatPassword).toHaveText('Repeat password');
  });
  it('Test titles', async () => {
    await expect(EmployeeProfile.profileTittle).toBeDisplayed();
    await expect(EmployeeProfile.profileTittle).toHaveText('Profile');
    await expect(EmployeeProfile.securityTittle).toBeDisplayed();
    await expect(EmployeeProfile.securityTittle).toHaveText('Security');
  });
  it('Test Buttons', async () => {
    await expect(EmployeeProfile.returnButton).toBeDisplayed();
    await expect(EmployeeProfile.returnButton).toBeClickable();
    await expect(EmployeeProfile.editButton).toBeDisplayed();
    await expect(EmployeeProfile.editButton).toBeClickable();
    await expect(EmployeeProfile.changePasswordButton).toBeDisplayed();
    await expect(EmployeeProfile.changePasswordButton).toBeClickable();
  });
  it('If we click on Return button, we should be redirected to the /employees', async () => {
    await expect(EmployeeProfile.returnButton).toBeDisplayed();
    await expect(EmployeeProfile.returnButton).toBeClickable();
    await EmployeeProfile.returnButton.click();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employees');
  });
});
