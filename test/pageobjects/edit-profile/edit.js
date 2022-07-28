const Page = require('../page');

class Edit extends Page {
  get inputName() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[1]/input');
  }
  get inputLastName() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[2]/input');
  }
  get inputDate() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[3]/input');
  }
  get inputDni() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[1]/div[4]/input');
  }
  get inputPass() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[1]/input');
  }
  get inputRePass() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[1]/div[2]/input');
  }
  get updateProfile() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[1]/div[2]/button[2]');
  }
  get updatePass() {
    return $('//*[@id="root"]/div/div/div[2]/section/form[2]/div[2]/button');
  }
  async setName(x) {
    await this.inputName.setValue(x);
  }
  async setLastName(y) {
    await this.inputLastName.setValue(y);
  }
  async setDate(z) {
    await this.inputDate.setValue(z);
  }
  async setDni(a) {
    await this.inputDni.setValue(a);
  }
  async setPass(b) {
    await this.inputPass.setValue(b);
  }
  async setRePass(c) {
    await this.inputRePass.setValue(c);
  }

  async updateUser(x, y, z, a) {
    await this.setName(x);
    await this.setLastName(y);
    await this.setDate(z);
    await this.setDni(a);
    await this.updateProfile.click();
  }
  async updateAdmin(x, y) {
    await this.setName(x);
    await this.setLastName(y);
    await this.updateProfile.click();
  }
  async updatePassword(b, c) {
    await this.setPass(b);
    await this.setRePass(c);
    await this.updatePass.click();
  }
}

module.exports = new Edit();
