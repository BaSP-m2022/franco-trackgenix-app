const Page = require('../page');
class TimeSheetForm extends Page {
  get tasks() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/label');
  }
  get tasksSelect() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/select');
  }
  get totalHours() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/label');
  }
  get totalHoursinput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/input');
  }
  get status() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/label');
  }
  get statusSelect() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/select');
  }
  get startDate() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/label');
  }
  get startDateInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/input');
  }
  get endDate() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[5]/label');
  }
  get endDateInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[5]/input');
  }
  get employees() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[6]/label');
  }
  get employeesSelect() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[6]/select');
  }
  get returnButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[1]');
  }
  get saveButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[2]');
  }

  get errorMessage() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div');
  }
  get errorMessageX() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/div/button');
  }
  get okErrorButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/div/button');
  }
  get successfullyMessage() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]');
  }
  get successfullyMessageX() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/button');
  }
  get successfullyMessagebutton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/div/button');
  }

  open() {
    return super.open('super-admins/form');
  }
}
module.exports = new TimeSheetForm();
