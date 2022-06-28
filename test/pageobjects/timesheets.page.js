class TimesheetsPage {
  // Getters
  get title() {
    return $('//*[@id="root"]/div/div/div[2]/section/h2');
  }

  get addTimesheet() {
    return $('//*[@id="root"]/div/div/div[2]/section/div/a');
  }

  get findTimesheet() {
    return $('//*[@id="header-search"]');
  }

  get table() {
    return $('//*[@id="root"]/div/div/div[2]/section/table');
  }

  get firstNameHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[1]');
  }

  get lastNameHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[2]');
  }

  get tasksHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[3]');
  }

  get totalHoursHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[4]');
  }

  get statusHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[5]');
  }

  get startDateHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[6]');
  }

  get endDateHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[7]');
  }

  get idHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[8]');
  }

  get firstName1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]');
  }

  get lastName1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]');
  }

  get tasks1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[3]');
  }

  get totalHours1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[4]');
  }

  get status1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]');
  }

  get startDate1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[6]');
  }

  get endDate1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[7]');
  }

  get id1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[8]');
  }

  get btnEdit1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[9]/button[1]');
  }

  get btnDelete1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[9]/button[2]');
  }

  get btnDeleteModalYes() {
    return $('//*[@id="root"]/div/div/div[2]/section/div[1]/div/div[2]/div/div/button[1]');
  }

  get btnDeleteModalNo() {
    return $('//*[@id="root"]/div/div/div[2]/section/div[1]/div/div[2]/div/div/button[2]');
  }

  // Methods
  async timesheetsForm() {
    await this.addTimesheet.click();
  }

  async editTimesheet() {
    await this.btnEdit1.click();
  }

  async deleteTimesheet() {
    await this.btnDelete1.click();
    await this.btnDeleteModalNo.click();
    await this.btnDelete1.click();
    await this.btnDeleteModalYes.click();
  }
}

module.exports = new TimesheetsPage();
