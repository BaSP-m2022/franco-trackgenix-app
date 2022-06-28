class TimesheetsFormPage {
  // Getters
  get title() {
    return $('//*[@id="root"]/div/div/div[2]/div/h3');
  }

  get totalHours() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/label');
  }

  get status() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/label');
  }

  get startDate() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/label');
  }

  get endDate() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[4]/label');
  }

  get employee() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[5]/label');
  }

  get totalHours1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/input');
  }

  get status1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/select');
  }

  get selectStatus1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/select/option[2]');
  }

  get startDate1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/input');
  }

  get endDate1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[4]/input');
  }

  get employee1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[5]/select');
  }

  get selectEmployee1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[5]/select/option[2]');
  }

  get btnAddTask() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[6]/button');
  }

  get taskAdded() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[6]/ul/li/div/label');
  }

  get taskAdded1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[6]/ul/li/div/select');
  }

  get taskAddedBtnDelete1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[6]/ul/li/button');
  }

  get btnReturn() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[7]/div/button[1]');
  }

  get btnSave() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[7]/div/button[2]');
  }

  get btnModalOk() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[7]/div[2]/div/div[2]/div/button');
  }

  // Setters
  async setTotalHours(totalHours) {
    await this.totalHours1.setValue(totalHours);
  }

  async setStartDate(startDate) {
    await this.startDate1.setValue(startDate);
  }

  async setEndDate(endDate) {
    await this.endDate1.setValue(endDate);
  }

  // Methods
  async addTask() {
    await this.btnAddTask.click();
  }

  async deleteTaskAdded1() {
    await this.taskAddedBtnDelete1.click();
  }

  async returnToTimesheets() {
    await this.btnReturn.click();
  }

  async saveToTimesheets(totalHours, startDate, endDate) {
    await this.setTotalHours(totalHours);
    await this.status1.click();
    await this.selectStatus1.click();
    await this.setStartDate(startDate);
    await this.setEndDate(endDate);
    await this.employee1.scrollIntoView();
    await this.employee1.click();
    await this.selectEmployee1.click();
    await this.btnSave.scrollIntoView();
    await this.btnSave.click();
    await this.btnModalOk.click();
  }
}

module.exports = new TimesheetsFormPage();
