const Page = require('../page');
class ProjectForm extends Page {
  get projectTittle() {
    return $('//*[@id="root"]/div/div/div[2]/div/h2');
  }
  get name() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/label');
  }
  get nameInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/input');
  }
  get status() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/label');
  }
  get statusSelect() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/select');
  }
  get selectStatus1() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_projects__2QKlH > div.sd_container__2ZPky > select > option:nth-child(4)'
    );
  }
  get description() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/label');
  }
  get descriptionInpunt() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/input');
  }
  get startDate() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div[1]/div/label');
  }
  get startDateInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div[1]/div/input');
  }
  get endDate() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div[2]/div/label');
  }
  get endDateInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div[2]/div/input');
  }
  get addEmployeeButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/button');
  }
  get employeeSelector() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_addEmployeeDiv__221IW > div > div:nth-child(1) > div:nth-child(1) > select'
    );
  }
  get selectEmployee1() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_addEmployeeDiv__221IW > div > div:nth-child(1) > div:nth-child(1) > select > option:nth-child(7)'
    );
  }
  get employeeSelector2() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_addEmployeeDiv__221IW > div > div:nth-child(2) > div:nth-child(1) > select'
    );
  }
  get selectEmployee2() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_addEmployeeDiv__221IW > div > div:nth-child(2) > div:nth-child(1) > select > option:nth-child(5)'
    );
  }
  get rateInput() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_addEmployeeDiv__221IW > div > div:nth-child(1) > div.input_container__1yWID > input'
    );
  }
  get rateInput2() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_addEmployeeDiv__221IW > div > div:nth-child(2) > div.input_container__1yWID > input'
    );
  }
  get roleSelect() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_addEmployeeDiv__221IW > div > div:nth-child(1) > div:nth-child(3) > select'
    );
  }
  get roleSelect2() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_addEmployeeDiv__221IW > div > div:nth-child(2) > div:nth-child(3) > select'
    );
  }
  get setPm() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_addEmployeeDiv__221IW > div > div:nth-child(1) > div:nth-child(3) > select > option:nth-child(2)'
    );
  }
  get setDev() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_addEmployeeDiv__221IW > div > div:nth-child(2) > div:nth-child(3) > select > option:nth-child(3)'
    );
  }
  get deleteEmployee() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/ul/div[1]/button ');
  }
  get returnButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[4]/button[1]');
  }
  get saveButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[4]/button[2]');
  }
  get okErrorButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/div/button');
  }
  get successfullyMessageModal() {
    return $('#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div');
  }
  get successfullMessage() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div > div.modal_modalDivChildren__2FU_o > p'
    );
  }
  get successfullyMessagebutton() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div > div.modal_modalDivChildren__2FU_o > div > button'
    );
  }

  get errorMessage1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/p');
  }

  get errorMessage2() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/p');
  }

  get errorMessage3() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/p');
  }

  get errorMessage4() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div[1]/div/p');
  }

  get errorMessage5() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/p');
  }
  get errorMessage6() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div[2]/div/p');
  }

  async setProjectName(projectName) {
    await this.nameInput.setValue(projectName);
  }

  async setProjectDrescription(description) {
    await this.descriptionInpunt.setValue(description);
  }
  async setStartDate(startDate) {
    await this.startDateInput.setValue(startDate);
  }
  async setEndDate(endDate) {
    await this.endDateInput.setValue(endDate);
  }
  async setEmployeeRate1(rate) {
    await this.rateInput.setValue(rate);
  }
  async setEmployeeRate2(rate) {
    await this.rateInput2.setValue(rate);
  }

  async setProject(projectName, description, startDate, endDate, rate1, rate2) {
    await this.setProjectName(projectName);
    await this.statusSelect.click();
    await this.selectStatus1.click();
    await this.setProjectDrescription(description);
    await this.setStartDate(startDate);
    await this.setEndDate(endDate);
    await this.addEmployeeButton.scrollIntoView();
    await this.addEmployeeButton.click();
    await this.employeeSelector.scrollIntoView();
    await this.employeeSelector.click();
    await this.selectEmployee1.click();
    await this.setEmployeeRate1(rate1);
    await this.setPm.click();
    await this.addEmployeeButton.scrollIntoView();
    await this.addEmployeeButton.click();
    await this.employeeSelector2.scrollIntoView();
    await this.employeeSelector2.click();
    await this.selectEmployee2.click();
    await this.setEmployeeRate2(rate2);
    await this.setDev.click();
    await this.saveButton.click();
  }
  async edit(projectName, description, startDate, endDate, rate2) {
    await this.setProjectName(projectName);
    await this.statusSelect.click();
    await this.selectStatus1.click();
    await this.setProjectDrescription(description);
    await this.setStartDate(startDate);
    await this.setEndDate(endDate);
    await this.addEmployeeButton.scrollIntoView();
    await this.addEmployeeButton.click();
    await this.employeeSelector2.scrollIntoView();
    await this.employeeSelector2.click();
    await this.selectEmployee2.click();
    await this.setEmployeeRate2(rate2);
    await this.setDev.click();
    await this.saveButton.click();
  }

  open() {
    return super.open('projecs/form');
  }
}

module.exports = new ProjectForm();
