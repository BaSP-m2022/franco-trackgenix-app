const Page = require('../page');
class TimeSheetForm extends Page {
  get selectProject1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/div/div/div[2]/select/option[2]');
  }
  get tasksSelect() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/select');
  }
  get selectEmployee1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/select/option[2]');
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
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/input');
  }
  get dateTask() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/div/div/div[1]/input');
  }
  get projectSelect() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/div/div/div[2]/select');
  }
  get description() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/div/div/div[3]/input');
  }
  get employeesSelect() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/select');
  }
  get workedHours() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/div/div/div[4]/input');
  }
  get addTasks() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_buttonDiv__13hs3 > button'
    );
  }
  get saveButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[5]/div/button[2]');
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

  async setTsStartDate(startDate) {
    await this.startDateInput.setValue(startDate);
  }
  async setDateTask(date) {
    await this.dateTask.setValue(date);
  }
  async setDescription(description) {
    await this.description.setValue(description);
  }
  async setWorkedHours(hours) {
    await this.workedHours.setValue(hours);
  }

  async setTimeSheet(startDate, date, description, hours) {
    await this.setTsStartDate(startDate);
    await this.employeesSelect.click();
    await this.selectEmployee1.click();
    await this.addTasks.click();
    await this.setDateTask(date);
    await this.projectSelect.click();
    await this.selectProject1.click();
    await this.setDescription(description);
    await this.setWorkedHours(hours);
    await this.saveButton.scrollIntoView();
    await this.saveButton.click();
  }
  async editTimesheet(startDate, date, description, hours) {
    await this.setTsStartDate(startDate);
    await this.setDateTask(date);
    await this.setDescription(description);
    await this.setWorkedHours(hours);
    await this.saveButton.scrollIntoView();
    await this.saveButton.click();
  }

  open() {
    return super.open('super-admins/form');
  }
}

module.exports = new TimeSheetForm();
