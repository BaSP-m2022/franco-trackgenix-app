const LoginPage = require('../../../../pageobjects/login/login.page');
const Aside = require('../../../../pageobjects/common-page-items/aside.page');

const deleteProject = async () => {
  const x = await $(
    '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.list_flex__1m8cc > table > tbody > tr:nth-child(5) > td:nth-child(7) > div > button:nth-child(2)'
  );
  await expect(x).toBeDisplayed();
  await expect(x).toBeClickable();
  await x.click();
  const modal = await $(
    '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.modal_modalOverlay__1UxHz > div'
  );
  await expect(modal).toBeDisplayed();
  const yesButton = await $(
    '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.modal_modalOverlay__1UxHz > div > div.modal_modalDivChildren__2FU_o > div > div > button.button_delete__30eE3'
  );
  await expect(yesButton).toBeDisplayed();
  await expect(yesButton).toBeClickable();
  await yesButton.click();
};

beforeAll('login', async () => {
  await LoginPage.open();
  await LoginPage.login('admin@gmail.com', 'admin123');
});

// afterEach('Refresh page', () => {
//   browser.url('https://franco-trackgenix-app.vercel.app/projects/');
// });

describe('Test projects main page interactions', () => {
  // it('If we delete a project, it is should be dissapear', async () => {
  //   await Aside.projectsRef.click();
  //   const name1 = await $(
  //     '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.list_flex__1m8cc > table > tbody > tr:nth-child(5) > td:nth-child(1)'
  //   ).getText();
  //   await deleteProject();
  //   const name2 = await $(
  //     '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.list_flex__1m8cc > table > tbody > tr:nth-child(5) > td:nth-child(1)'
  //   ).getText();
  //   let comparation = false;
  //   if (name1 !== name2) {
  //     comparation = true;
  //   }
  //   await expect(comparation).toBeTrue();
  // });
  it('If we delete a project, the second row now, should be the first', async () => {
    await Aside.projectsRef.click();
    const name1 = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.list_flex__1m8cc > table > tbody > tr:nth-child(6) > td:nth-child(1)'
    ).getText();
    await deleteProject();
    const name2 = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.list_flex__1m8cc > table > tbody > tr:nth-child(5) > td:nth-child(1)'
    ).getText();
    let comparation = false;
    if (name1 == name2) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
  // it('We can filter a project correctly', async () => {
  //   const name1 = await $(
  //     '//*[@id="root"]/div/div/div[2]/section/div[2]/table/tbody/tr[2]/td[2]'
  //   ).getText();
  //   const inputSearch = await $('//*[@id="header-search"]');
  //   await inputSearch.setValue(name1);
  //   const name2 = await $(
  //     '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.list_flex__1m8cc > table > tbody > tr:nth-child(5) > td:nth-child(1)'
  //   ).getText();
  //   let comparation = false;
  //   if (name1 == name2) {
  //     comparation = true;
  //   }
  //   await expect(comparation).toBeTrue();
  // });
});
