class TrackgenixPage {
  // Getters
  get btnHome() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[1]/a');
  }

  get btnTimesheets() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[6]/a');
  }

  get btnTasks() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[7]/a');
  }

  // Methods
  async homeSection() {
    await this.btnHome.click();
  }

  async timesheetsSection() {
    await this.btnTimesheets.click();
  }

  async tasksSection() {
    await this.btnTasks.click();
  }
}

module.exports = new TrackgenixPage();
