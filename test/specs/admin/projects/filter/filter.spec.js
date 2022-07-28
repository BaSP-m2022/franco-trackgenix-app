const LoginPage = require('../../../../pageobjects/login/login.page');

beforeAll('Login whit admin', () => {
  LoginPage.open();
  LoginPage.login('admin@gmail.com', 'admin123');
});

describe('test filter', () => {
  it('We can filter a project correctly', async () => {
    const name1 = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.list_flex__1m8cc > table > tbody > tr:nth-child(5) > td:nth-child(1)'
    ).getText();
    const inputSearch = await $('//*[@id="header-search"]');
    await inputSearch.setValue(name1);
    const name2 = await $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.list_flex__1m8cc > table > tbody > tr:nth-child(1) > td:nth-child(1)'
    ).getText();
    let comparation = false;
    if (name1 == name2) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
});
