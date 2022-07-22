const Page = require('../page');

class ProjectsPage extends Page {
  get title() {
    return $('//*[@id="root"]/div/div/div[2]/section/h2');
  }
  get addProject() {
    return $('//*[@id="root"]/div/div/div[2]/section/div/button');
  }
  get searchInput() {
    return $('//*[@id="header-search"]');
  }
  get projectTable() {
    return $('//*[@id="root"]/div/div/div[2]/section/table');
  }
  get tableHead() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/thead/tr');
  }
  get projectId() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[1]');
  }
  get projectName() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[2]');
  }
  get projectStatus() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[3]');
  }
  get projectDescription() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[4]');
  }
  get startDate() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]');
  }
  get endDate() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[6]');
  }
  get editButton() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > div.list_flex__1m8cc > table > tbody > tr:nth-child(7) > td:nth-child(7) > div > button:nth-child(1)'
    );
  }
  get deleteButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[7]/button[2]');
  }
  open() {
    return super.open('home');
  }
}

module.exports = new ProjectsPage();
