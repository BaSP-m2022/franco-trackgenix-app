const LoginPage = require('../../../../pageobjects/login/login.page');

beforeAll('Login whit admin', () => {
  LoginPage.open();
  LoginPage.login('admin@gmail.com', 'admin123');
});

describe('test filter', () => {
  it('We can filter an employee correctly', async () => {
    const name1 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[2]/td[1]'
    ).getText();
    const inputSearch = await $('//*[@id="header-search"]');
    await inputSearch.setValue(name1);
    const name2 = await $(
      '//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]'
    ).getText();
    let comparation = false;
    if (name1 == name2) {
      comparation = true;
    }
    await expect(comparation).toBeTrue();
  });
});
