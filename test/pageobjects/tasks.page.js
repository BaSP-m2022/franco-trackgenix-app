class TasksPage {
  // Getters
  get title() {
    return $('//*[@id="root"]/div/div/div[2]/section/h2');
  }

  get addTask() {
    return $('//*[@id="root"]/div/div/div[2]/section/div/button');
  }

  get findTask() {
    return $('//*[@id="header-search"]');
  }

  get table() {
    return $('//*[@id="root"]/div/div/div[2]/section/table');
  }

  get idHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[1]');
  }

  get descriptionHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[2]');
  }

  get workedHoursHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[3]');
  }

  get projectHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[4]');
  }

  get dateHeader() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr/th[5]');
  }

  get id1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]');
  }

  get description1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]');
  }

  get workedHours1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[3]');
  }

  get project1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[4]');
  }

  get date1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]');
  }

  get btnEdit1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[6]/button[1]');
  }

  get btnDelete1() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[6]/button[2]');
  }
}

module.exports = new TasksPage();
