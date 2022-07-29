const Page = require('./page');
class superAdminForm extends Page {
  get formTitle() {
    return $('.form_h3__1RBbE');
  }
  get firstName() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/label');
  }
  get firstNameInput() {
    return $('div.input_container__1yWID:nth-child(1) > input:nth-child(2)');
  }
  get firstNameMsg() {
    return $('div.input_container__1yWID:nth-child(1) > p:nth-child(3)');
  }
  get lastName() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/label');
  }
  get lastnameInput() {
    return $('div.input_container__1yWID:nth-child(2) > input:nth-child(2)');
  }
  get lastnameMsg() {
    return $('div.input_container__1yWID:nth-child(2) > p:nth-child(3)');
  }
  get email() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/label');
  }
  get emailInput() {
    return $('div.input_container__1yWID:nth-child(3) > input:nth-child(2)');
  }
  get emailMsg() {
    return $('div.input_container__1yWID:nth-child(3) > p:nth-child(3)');
  }
  get password() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/label');
  }
  get passwordInput() {
    return $('div.input_container__1yWID:nth-child(4) > input:nth-child(2)');
  }
  get passwordMsg() {
    return $('div.input_container__1yWID:nth-child(4) > p:nth-child(3)');
  }
  get returnButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[1]');
  }
  get saveButton() {
    return $('button.button_btn__3WL0L:nth-child(2)');
  }
  get modal() {
    return $('.modal_modalDivTitle__3Te57');
  }
  get titleModal() {
    return $('.modal_modalDivTitle__3Te57 > h3:nth-child(1)');
  }
  get textModal() {
    return $('.form_message__3rf0M');
  }
  get modalOk() {
    return $('.modal_modalDivChildren__2FU_o > div:nth-child(2) > button:nth-child(1)');
  }

  async setFirstName(firstname) {
    await this.firstNameInput.setValue(firstname);
  }
  async setLastName(lastname) {
    await this.lastnameInput.setValue(lastname);
  }
  async setEmail(email) {
    await this.emailInput.setValue(email);
  }
  async setPassword(password) {
    await this.passwordInput.setValue(password);
  }

  open() {
    return super.open('admins/form');
  }

  async updateSuperAdmin(firstname, lastname, email, password) {
    const elem = await $('button.button_btn__3WL0L:nth-child(2)');
    await this.setFirstName(firstname);
    await this.setLastName(lastname);
    await this.setEmail(email);
    await this.setPassword(password);
    await elem.scrollIntoView();
    await this.saveButton.click();
    await expect(this.modal).toBeDisplayed();
    await expect(this.titleModal).toBeDisplayed();
    await expect(this.titleModal).toHaveText('Admin Updated');
    await expect(this.textModal).toHaveText('Admin has been updated');
    await expect(this.modalOk).toBeDisplayed();
    await this.modalOk.click();
  }
  async updateSuperAdminFailed(firstname, lastname, email, password) {
    const elem = await $('button.button_btn__3WL0L:nth-child(2)');
    await this.setFirstName(firstname);
    await this.setLastName(lastname);
    await this.setEmail(email);
    await this.setPassword(password);
    await elem.scrollIntoView();
    await this.saveButton.click();
  }
  async addSuperAdmin(firstname, lastname, email, password) {
    const elem = await $('button.button_btn__3WL0L:nth-child(2)');
    await this.setFirstName(firstname);
    await this.setLastName(lastname);
    await this.setEmail(email);
    await this.setPassword(password);
    await elem.scrollIntoView();
    await this.saveButton.click();
    await expect(this.modal).toBeDisplayed();
    await expect(this.titleModal).toBeDisplayed();
    await expect(this.titleModal).toHaveText('Admin Created');
    await expect(this.textModal).toHaveText('Admin has been created');
    await expect(this.modalOk).toBeDisplayed();
    await this.modalOk.click();
  }
}

module.exports = new superAdminForm();