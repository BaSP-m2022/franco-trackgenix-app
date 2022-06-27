const Page = require('../page');

class EmployeeProfile extends Page {
  get profileTittle() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/h2');
  }
  get firstName() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[1]/label');
  }

  get firstNameInput() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[1]/input');
  }
  get lastName() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[2]/label');
  }

  get lastNameInput() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[2]/input');
  }
  get email() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[3]/label');
  }

  get emailInput() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[3]/input');
  }
  get dateOfBirth() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[4]/label');
  }

  get dateOfBirthInput() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[4]/input');
  }

  get dni() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[5]/label');
  }

  get dniInput() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[5]/input');
  }
  get returnButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[2]/button[1]');
  }

  get editButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[2]/button[2]');
  }

  get securityTittle() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/h2');
  }

  get oldPassword() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[1]/label');
  }

  get oldPasswordInput() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[1]/input');
  }
  get newPassword() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[2]/label');
  }

  get newPasswordInput() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[2]/input');
  }
  get repeatPassword() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[3]/label');
  }

  get repeatPasswordInput() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[3]/input');
  }
  get changePasswordButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[2]/button');
  }
  get successfullyMessage() {
    return $('//*[@id="root"]/div/div/div[2]/section/div/div');
  }
  get successfullyMessagebutton() {
    return $('//*[@id="root"]/div/div/div[2]/section/div/div/div[2]/div/button');
  }
  get successfullyMessageX() {
    return $('//*[@id="root"]/div/div/div[2]/section/div/div/div[1]/button');
  }

  async setFirstName(firstName) {
    await this.firstNameInput.setValue(firstName);
  }
  async setLastName(lastname) {
    await this.lastNameInput.setValue(lastname);
  }
  async setEmail(email) {
    await this.emailInput.setValue(email);
  }
  async setDoB(dob) {
    await this.dateOfBirthInput.setValue(dob);
  }
  async setDni(dni) {
    await this.dniInput.setValue(dni);
  }

  async setOldPassword(oldPassword) {
    await this.oldPasswordInput.setValue(oldPassword);
  }
  async setNewPassword(newPassword) {
    await this.newPasswordInput.setValue(newPassword);
  }
  async setRepeatPassword(repeatPassword) {
    await this.repeatPasswordInput.setValue(repeatPassword);
  }

  async editProfile(firstName, lastName, email, dob, dni) {
    await this.setFirstName(firstName);
    await this.setLastName(lastName);
    await this.setEmail(email);
    await this.setDoB(dob);
    await this.setDni(dni);
    await this.editButton.click();
  }
  async changePassword(oldPassword, newPassword, repeatPassword) {
    await this.open();
    await this.setOldPassword(oldPassword);
    await this.setNewPassword(newPassword);
    await this.setRepeatPassword(repeatPassword);
    await this.changePasswordButton.click();
  }
  async clearValues() {
    this.firstNameInput.clearValue();
    this.lastNameInput.clearValue();
    this.emailInput.clearValue();
    this.dateOfBirthInput.clearValue();
    this.dniInput.clearValue();
  }

  open() {
    return super.open('employee/profile');
  }
}

module.exports = new EmployeeProfile();
