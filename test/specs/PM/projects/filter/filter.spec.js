const LoginPage = require('../../../../pageobjects/login/login.page');

beforeAll('login', async () => {
  await browser.url('https://franco-trackgenix-app.vercel.app/login');
  await LoginPage.login('eee@gmail.com', 'admin123');
});
describe('test filter', () => {
  it('We can filter a project correctly', async () => {
    await expect(browser).toHaveUrl('https://franco-trackgenix-app.vercel.app/employee/home');
    await browser.url('https://franco-trackgenix-app.vercel.app/projects');
    await browser.fullscreenWindow();
    const name1 = await $(
      '//*[@id="root"]/div/div/div[2]/section/div[2]/table/tbody/tr/td[1]'
    ).getText();
    const inputSearch = await $('//*[@id="header-search"]');
    await inputSearch.setValue(name1);
    await browser.pause(500);
    const name2 = await $(
      '//*[@id="root"]/div/div/div[2]/section/div[2]/table/tbody/tr/td[1]'
    ).getText();
    let comparation = false;
    if (name1 == name2) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
  it('none element find', async () => {
    await browser.url('https://franco-trackgenix-app.vercel.app/projects');
    await browser.fullscreenWindow();
    const name1 = 'falseproject';
    const tableProject = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.list_flex__1m8cc > table > tbody > tr'
    );
    const inputSearch = await $('//*[@id="header-search"]');
    await inputSearch.setValue(name1);
    await browser.pause(500);
    await expect(tableProject).not.toBeDisplayed();
  });
});
