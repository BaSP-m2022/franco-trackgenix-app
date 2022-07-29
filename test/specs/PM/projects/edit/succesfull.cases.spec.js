const ProjectForm = require('../../../../pageobjects/projects/project.form');
const ProjectPage = require('../../../../pageobjects/projects/projects.page');
const LoginPage = require('../../../../pageobjects/login/login.page');

beforeAll('login', async () => {
  await browser.url('https://franco-trackgenix-app.vercel.app/login');
  await LoginPage.login('eee@gmail.com', 'admin123');
});

describe('Test all successfull Cases', () => {
  it('If we put valid credentials we can edit an employee and go back to the form', async () => {
    await browser.fullscreenWindow();
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employee/home');
    await browser.url('https://franco-trackgenix-app.vercel.app/projects');
    await expect(ProjectPage.editButton2).toBeDisplayed();
    await expect(ProjectPage.editButton2).toBeClickable();
    await ProjectPage.editButton2.click();
    await browser.fullscreenWindow();
    await ProjectForm.editPM('Project', 'Description', '01/07/2022', '30/07/2022', '50', '50');
    await expect(ProjectForm.successfullyMessageModal).toBeDisplayed();
    await expect(ProjectForm.successfullMessage).toBeDisplayed();
    await expect(ProjectForm.successfullMessage).toHaveText('Project updated successfully!');
    await expect(ProjectForm.successfullyMessagebutton).toBeDisplayed();
    await expect(ProjectForm.successfullyMessagebutton).toBeClickable();
    await browser.pause(500);//eslint-disable-line
  });
});
