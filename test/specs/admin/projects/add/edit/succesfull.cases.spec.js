const ProjectForm = require('../../../../../pageobjects/projects/project.form');
const ProjectPage = require('../../../../../pageobjects/projects/projects.page');
const LoginPage = require('../../../../../pageobjects/login/login.page');

beforeAll('login', async () => {
  await LoginPage.open();
  await LoginPage.login('admin@gmail.com', 'admin123');
  const projects = await $(
    '#root > div > div > div.layout_divSideBar__Lze09 > nav > div:nth-child(2) > ul > div > ul > li:nth-child(2) > a'
  );
  await projects.click();
  const addProject = await $('//*[@id="root"]/div/div/div[2]/section/div/button');
  await addProject.click();
});

describe('Test all successfull Cases', () => {
  it('If we put valid credentials we can create an employee', async () => {
    await ProjectForm.setProject('Project', 'Description', '01/07/2022', '30/07/2022', '50', '50');
    await expect(ProjectForm.successfullyMessageModal).toBeDisplayed();
    await expect(ProjectForm.successfullMessage).toBeDisplayed();
    await expect(ProjectForm.successfullMessage).toHaveText('Project created successfully!');
    await expect(ProjectForm.successfullyMessagebutton).toBeDisplayed();
    await expect(ProjectForm.successfullyMessagebutton).toBeClickable();
    await expect(ProjectForm.successfullyMessagebutton).click();
  });
  it('If we put valid credentials we can edit an employee and go back to the form', async () => {
    await browser.url('https://franco-trackgenix-app.vercel.app/projects');
    await expect(ProjectPage.editButton).toBeDisplayed();
    await expect(ProjectPage.editButton).toBeClickable();
    await ProjectPage.editButton.click();
    await ProjectForm.edit('Project', 'Description', '01/07/2022', '30/07/2022', '50', '50');
    await expect(ProjectForm.successfullyMessageModal).toBeDisplayed();
    await expect(ProjectForm.successfullMessage).toBeDisplayed();
    await expect(ProjectForm.successfullMessage).toHaveText('Project updated successfully!');
    await expect(ProjectForm.successfullyMessagebutton).toBeDisplayed();
    await expect(ProjectForm.successfullyMessagebutton).toBeClickable();
  });
});
