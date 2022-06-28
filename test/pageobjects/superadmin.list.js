const Page = require('./page');

class SuperAdminsPage extends Page {
  get addSuperAdmin() {
    return $('.button_btn__3WL0L');
  }
  get searchInput() {
    return $('#header-search');
  }
  get superAdminTitle() {
    return $('.super-admins_containerSuperAdmin__Guysa > h2:nth-child(1)');
  }
  get table() {
    return $('.table_tableMain__1saoQ');
  }
  get tableHead() {
    return $('.table_tableMain__1saoQ > thead:nth-child(1) > tr:nth-child(1)');
  }
  get superAdmin1FirstName() {
    return $('tr.table_containerTable__v3dkK:nth-child(1) > td:nth-child(1)');
  }
  get superAdmin1LastName() {
    return $('tr.table_containerTable__v3dkK:nth-child(1) > td:nth-child(2)');
  }
  get superAdmin1Email() {
    return $('tr.table_containerTable__v3dkK:nth-child(1) > td:nth-child(3)');
  }
  get superAdmin1Id() {
    return $('tr.table_containerTable__v3dkK:nth-child(1) > td:nth-child(4)');
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
