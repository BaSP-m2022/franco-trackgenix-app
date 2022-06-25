const Page = require('../page');
class superAdminForm extends Page {
  get firstName() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/label');
  }
  get firtNameInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/input');
  }
  get lastName() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/label');
  }
  get lastnameInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/input');
  }
  get email() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/label');
  }
  get emailInpunt() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/input');
  }
  get password() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/label');
  }
  get passwordInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/input');
  }
  get returnButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[1]');
  }
  get saveButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[2]');
  }

  get errorMessage() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div');
  }
  get errorMessageX() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/div/button');
  }
  get okErrorButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/div/button');
  }
  get successfullyMessage() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]');
  }
  get successfullyMessageX() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/button');
  }
  get successfullyMessagebutton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/div/button');
  }

  open() {
    return super.open('super-admins/form');
  }
}

module.exports = new superAdminForm();
