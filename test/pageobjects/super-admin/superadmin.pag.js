const Page = require('../page');

class SuperAdminsPage extends Page {
  get addSuperAdmin() {
    return $('//*[@id="root"]/div/div/div[2]/section/div/button');
  }
  get searchInput() {
    return $('#header-search');
  }
  get superAdminTitle() {
    return $('//*[@id="root"]/div/div/div[2]/section/h2');
  }
  get table() {
    return $('//*[@id="root"]/div/div/div[2]/section/table');
  }
  get tableHead() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr');
  }
  get superAdmin1FirstName() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]');
  }
  get superAdmin1LastName() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]');
  }
  get superAdmin1Email() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[3]');
  }
  get superAdmin1Id() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[4]');
  }
  get superAdmin1EditButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]/button[1]');
  }
  get superAdmin1DeleteButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]/button[2]');
  }

  open() {
    return super.open('super-admins');
  }
}

module.exports = new SuperAdminsPage();
