const Page = require('../page');

class Tasks extends Page {
  get addTasks() {
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
  get tasksId() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]');
  }
  get tasksDescription() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]');
  }
  get tasksWorkedHourts() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[3]');
  }
  get tasksProject() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[4]');
  }
  get tasksDate() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]');
  }
  get tasksEditButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[6]/button[1]');
  }
  get tasksDeleteButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[6]/button[2]');
  }
  open() {
    return super.open('tasks');
  }
}

module.exports = new Tasks();
