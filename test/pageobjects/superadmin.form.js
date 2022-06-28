const Page = require('./page');
class superAdminForm extends Page {
  get formTitle() {
    return $('.admin_h3__1ZGmz');
  }
  get firstName() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/label');
  }
  get firtNameInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/input');
  }
  get firtNameMsg() {
    return $('div.input_container__1yWID:nth-child(1) > p:nth-child(3)');
  }
  get lastName() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/label');
  }
  get lastnameInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/input');
  }
  get lastnameMsg() {
    return $('div.input_container__1yWID:nth-child(2) > p:nth-child(3)');
  }
  get email() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/label');
  }
  get emailInpunt() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/input');
  }
  get emailMsg() {
    return $('div.input_container__1yWID:nth-child(3) > p:nth-child(3)');
  }
  get password() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/label');
  }
  get passwordInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/input');
  }
  get passwordMsg() {
    return $('div.input_container__1yWID:nth-child(4) > p:nth-child(3)');
  }
  get returnButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[1]');
  }
  get saveButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[2]');
  }
  get modal() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div');
  }
  get titleModal() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]');
  }
  get modalX() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[1]/button');
  }
  get modalOk() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div/div[2]/div/button');
  }
  //que aparezca header footer y asside clickeables

  open() {
    return super.open('super-admins/form');
  }
}

module.exports = new superAdminForm();
