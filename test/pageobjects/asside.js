class Aside {
  get menuAside() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[1]/h2');
  }
  get contactUstext() {
    return $('.sidebar_contact__2kbAP');
  }
  get homeRef() {
    return $('.NavLink_links__2x0sd');
  }
  get adminsRef() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[2]/a');
  }
  get superAdminsRef() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[3]/a');
  }
  get employeesRef() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[4]/a');
  }
  get projectsRef() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[5]/a');
  }
  get timesheetsRef() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[6]/a');
  }
  get tasksRef() {
    return $('//*[@id="root"]/div/div/div[1]/nav/div[2]/ul/li[7]/a');
  }
  get contact() {
    return $('.sidebar_routes__z9lYA > li:nth-child(3) > p:nth-child(1)');
  }
  get phone() {
    return $('.sidebar_routes__z9lYA > li:nth-child(4) > p:nth-child(1)');
  }
  get address() {
    return $('.sidebar_routes__z9lYA > li:nth-child(5)');
  }
}

module.exports = new Aside();
