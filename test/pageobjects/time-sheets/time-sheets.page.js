const Page = require('../page');

class TimeSheetsPage extends Page {
  get title() {
    return $('//*[@id="root"]/div/div/div[2]/section/h2');
  }
  get addTimesheet() {
    return $('#root > div > div > div.layout_divSwitch__2iaq7 > section > div > a');
  }
  get searchInput() {
    return $('//*[@id="header-search"]');
  }
  get timesheetTable() {
    return $('//*[@id="root"]/div/div/div[2]/section/table');
  }
  get tableHead() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr');
  }
  get employeefirstName() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]');
  }
  get employee1LastName() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]');
  }
  get tasks() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[3]');
  }
  get totalHours() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[4]');
  }
  get status() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]');
  }
  get startDate() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[6]');
  }
  get endDate() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[7]');
  }
  get timesheetId() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[8]');
  }
  get editButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[9]/button[1]');
  }
  get deleteButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[9]/button[2]');
  }
  open() {
    return super.open('time-sheets');
  }
}

module.exports = new TimeSheetsPage();
