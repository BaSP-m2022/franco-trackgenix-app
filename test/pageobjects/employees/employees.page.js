const Page = require('../page');

class EmployeesPage extends Page {
  get title() {
    return $('//*[@id="root"]/div/div/div[2]/section/h2');
  }
  get addEmployee() {
    return $('//*[@id="root"]/div/div/div[2]/section/div/button');
  }
  get searchInput() {
    return $('//*[@id="header-search"]');
  }
  get employeeTable() {
    return $('//*[@id="root"]/div/div/div[2]/section/table');
  }
  get tableHead() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr');
  }
  get employee1Id() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]');
  }
  get employeefirstName() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]');
  }
  get employee1LastName() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[3]');
  }
  get employeeDni() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[4]');
  }
  get employee1Email() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]');
  }
  get employee1Dob() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[6]');
  }

  get editButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[7]/button[1]');
  }
  get deleteButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[7]/button[2]');
  }

  open() {
    return super.open('employees');
  }
}

module.exports = new EmployeesPage();
