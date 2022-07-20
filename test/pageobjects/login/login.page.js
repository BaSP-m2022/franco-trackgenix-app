const Page = require('../page');

class LoginPage extends Page {
  get emailInput() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > form > div:nth-child(1) > div:nth-child(1) > input'
    );
  }
  get passwordInput() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > form > div:nth-child(1) > div:nth-child(2) > input'
    );
  }
  get returnButton() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > form > div.login_buttonContainer__39zfO > button:nth-child(1)'
    );
  }
  get loginButton() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > form > div.login_buttonContainer__39zfO > button:nth-child(2)'
    );
  }
  get signupButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[3]/button');
  }
  get modalError() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > div > div > div.modal_modalDivChildren__2FU_o'
    );
  }
  get errorMsg() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > div > div > div.modal_modalDivTitle__3Te57 > h3'
    );
  }
  get okErrorButton() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > div > div > div.modal_modalDivChildren__2FU_o > div > button'
    );
  }
  get inputError1() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > form > div:nth-child(1) > div:nth-child(1) > p'
    );
  }
  get inputError2() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > form > div:nth-child(1) > div:nth-child(2) > p'
    );
  }
  get inputError3() {
    return $(
      '#root > div > div > div.layout_divSwitch__2iaq7 > section > form > div:nth-child(1) > div:nth-child(1) > p'
    );
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
