const Page = require('../page');

class LoginPage extends Page {
  get emailInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/input');
  }
  get passwordInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/input');
  }
  get returnButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[1]');
  }
  get loginButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[2]');
  }
  get signupButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/button');
  }
  get modalError() {
    return $('//*[@id="root"]/div/div/div[2]/div/div/div');
  }
  get errorMsg() {
    return $('//*[@id="root"]/div/div/div[2]/div/div/div/div[1]/h3');
  }
  get okErrorButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/div/div/div[2]/div/button');
  }
  get inputError1() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/p');
  }
  get inputError2() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/p');
  }
  get inputError3() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/p');
  }

  async setEmail(email) {
    await this.emailInput.setValue(email);
  }
  async setPassword(password) {
    await this.passwordInput.setValue(password);
  }

  async login(email, password) {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.loginButton.click();
  }

  open() {
    return super.open('super-admins/login');
  }
}

module.exports = new LoginPage();
