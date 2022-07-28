const Page = require('../page');

class Aside extends Page {
  get menuAside() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[1]/h2');
  }
  get contactUstext() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[8]/p');
  }
  get homeRef() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/div/ul/li[1]/a');
  }
  get adminsRef() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[2]/a');
  }
  get superAdminsRef() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[3]/a');
  }
  get employeesRef() {
    return $(
      '#root > div > div > div.layout_divSideBar__Lze09 > nav > div:nth-child(2) > ul > div > ul > li:nth-child(1) > a'
    );
  }
  get projectsRef() {
    return $(
      '#root > div > div > div.layout_divSideBar__Lze09 > nav > div:nth-child(2) > ul > div > ul > li:nth-child(2) > a'
    );
  }
  get timesheetsRef() {
    return $(
      '#root > div > div > div.layout_divSideBar__Lze09 > nav > div:nth-child(2) > ul > div > ul > li:nth-child(3) > a'
    );
  }
  get tasksRef() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[7]/a');
  }
  get contact() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[9]/p');
  }
  get phone() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[10]/p');
  }
  get address() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[11]/p');
  }
}

module.exports = new Aside();
