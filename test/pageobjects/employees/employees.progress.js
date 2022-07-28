const Page = require('../page');

class EmployeesProgress extends Page {
  get title() {
    return $('//*[@id="root"]/div/div/div[2]/div/h2');
  }
  get table() {
    return $('//*[@id="root"]/div/div/div[2]/div/table');
  }
  get backButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/thead/tr[1]/th/button[1]');
  }
  get forwardButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/thead/tr[1]/th/button[2]');
  }
  get currentWeek() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/thead/tr[1]/th/span');
  }
  get workedHoursDay1Project1() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/tbody/tr[1]/td[2]/b');
  }
  get workedHoursDay2Project1() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/tbody/tr[1]/td[3]/b');
  }
  get workedHoursDay3Project1() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/tbody/tr[1]/td[4]/b');
  }
  get workedHoursDay4Project1() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/tbody/tr[1]/td[5]/b');
  }
  get workedHoursDay5Project1() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/tbody/tr[1]/td[6]/b');
  }
  get workedHoursDay6Project1() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/tbody/tr[1]/td[7]/b');
  }
  get workedHoursDay7Project1() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/tbody/tr[1]/td[8]/b');
  }
  get workedHoursTotalProject1() {
    return $('//*[@id="root"]/div/div/div[2]/div/table/tbody/tr[1]/td[9]/b');
  }
  get addProgressButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/div/button');
  }
  get addProgressModal() {
    return $('//*[@id="root"]/div/div/div[2]/div/div[1]/div');
  }
  get selectDate4() {
    return $(
      '//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/div/form/div[4]/div/div[1]/div/select'
    );
  }
  get selectDate4Option2() {
    return $(
      '//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/div/form/div[4]/div/div[1]/div/select/option[2]'
    );
  }
  get selectProject4() {
    return $(
      '//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/div/form/div[4]/div/div[2]/div/select'
    );
  }
  get selectProject4Option1() {
    return $(
      '//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/div/form/div[4]/div/div[2]/div/select/option[2]'
    );
  }
  get selectDescription4() {
    return $(
      '//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/div/form/div[4]/div/div[3]/div/input'
    );
  }
  get selectWorkedHours4() {
    return $(
      '//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/div/form/div[4]/div/div[4]/div/input'
    );
  }
  get selectWorkedHours1() {
    return $(
      '//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/div/form/div[1]/div/div[4]/div/input'
    );
  }
  get addTaskButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/div/form/div[4]/button');
  }
  get saveButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/div/form/button[1]');
  }
  get cancelButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/div/form/button[2]');
  }
  get modalBox() {
    return $('//*[@id="root"]/div/div/div[2]/div/div[2]/div');
  }
  get modalOkButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/div[2]/div/div[2]/div/button');
  }

  async changeDescription4(description4) {
    await this.selectDescription4.setValue(description4);
  }
  async changeWorkedHours4(workedHours4) {
    await this.selectWorkedHours4.setValue(workedHours4);
  }
  async changeWorkedHours1(workedHours1) {
    await this.selectWorkedHours1.setValue(workedHours1);
  }

  open() {
    return super.open('employees');
  }
}

module.exports = new EmployeesProgress();
