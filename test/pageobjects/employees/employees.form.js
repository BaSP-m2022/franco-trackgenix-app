const Page = require('../page');

class EmployeeForm extends Page {
  get employeeTitle() {
    return $('//*[@id="root"]/div/div/div[2]/div/h2');
  }
  get firstName() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/label');
  }

  get firstNameInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/input');
  }
  get lastName() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/label');
  }

  get lastNameInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/input');
  }
  get DateOfBirth() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/label');
  }

  get dateOfBirthInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/input');
  }
  get dni() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/label');
  }

  get dniInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/input');
  }
  get email() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[5]/label');
  }

  get emailInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[5]/input');
  }
  get password() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[6]/label');
  }

  get passwordInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[6]/input');
  }
  get returnButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[1]');
  }

  get saveButton() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.form_buttonContainer__3pZdH > button:nth-child(2)'
    );
  }

  get Message() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div > div.modal_modalDivChildren__2FU_o > p'
    );
  }
  get Messagebutton() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div > div.modal_modalDivChildren__2FU_o > div > button'
    );
  }
  get MessageX() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/button');
  }

  async setFirstName(firstName) {
    await this.firstNameInput.setValue(firstName);
  }
  async setLastName(lastname) {
    await this.lastNameInput.setValue(lastname);
  }
  async setDoB(dob) {
    await this.dateOfBirthInput.setValue(dob);
  }
  async setDni(dni) {
    await this.dniInput.setValue(dni);
  }

  async setEmail(email) {
    await this.emailInput.setValue(email);
  }
  async setPassword(password) {
    await this.passwordInput.setValue(password);
  }

  async setValues(firstName, lastName, dob, dni, email, password) {
    await this.setFirstName(firstName);
    await this.setLastName(lastName);
    await this.setDoB(dob);
    await this.setDni(dni);
    await this.setEmail(email);
    await this.setPassword(password);
    await this.saveButton.click();
  }

  async setValuesb(firstName, lastName, dob, dni, email, password) {
    await this.setFirstName(firstName);
    await this.setLastName(lastName);
    await this.setDoB(dob);
    await this.setDni(dni);
    await this.setEmail(email);
    await this.setPassword(password);
  }

  open() {
    return super.open('employees/form');
  }
}

module.exports = new EmployeeForm();
