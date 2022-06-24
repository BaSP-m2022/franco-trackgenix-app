const Page = require('../page');
class AdminPage extends Page {

  get addAdmin () {return $('//*[@id="root"]/div/div/div[2]/section/div/button')};
  get searchInput () {return $('#header-search')};
  get adminTitle () {return $('//*[@id="root"]/div/div/div[2]/section/h2')};
  get table () {return $('//*[@id="root"]/div/div/div[2]/section/table')};
  get tableHead () {return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr')};
  get admin1FirstName () {return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]')};
  get admin1LastName () {return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]')};
  get admin1Email () {return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[3]')};
  get admin1Id () {return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[4]')};
  get admin1EditButton () {return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]/button[1]')};
  get admin1DeleteButton () {return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]/button[2]')};

  open () {
    return super.open('admins');
  }
}


module.exports = new AdminPage();


