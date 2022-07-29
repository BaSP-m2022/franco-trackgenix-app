const Page = require('./page');
class superAdminForm extends Page {
  get formTitle() {
    return $('.form_title__1YfJp');
  }
  get firstName() {
    return $('div.input_container__1yWID:nth-child(1) > label:nth-child(1)');
  }
  get firstNameInput() {
    return $('div.input_container__1yWID:nth-child(1) > input:nth-child(2)');
  }
  get firstNameMsg() {
    return $('div.input_container__1yWID:nth-child(1) > p:nth-child(3)');
  }
  get lastName() {
    return $('div.input_container__1yWID:nth-child(2) > label:nth-child(1)');
  }
  get lastnameInput() {
    return $('div.input_container__1yWID:nth-child(2) > input:nth-child(2)');
  }
  get lastnameMsg() {
    return $('div.input_container__1yWID:nth-child(2) > p:nth-child(3)');
  }
  get email() {
    return $('div.input_container__1yWID:nth-child(3) > label:nth-child(1)');
  }
  get emailInput() {
    return $('div.input_container__1yWID:nth-child(3) > input:nth-child(2)');
  }
  get emailMsg() {
    return $('div.input_container__1yWID:nth-child(3) > p:nth-child(3)');
  }
  get password() {
    return $('div.input_container__1yWID:nth-child(4) > label:nth-child(1)');
  }
  get passwordInput() {
    return $('div.input_container__1yWID:nth-child(4) > input:nth-child(2)');
  }
  get passwordMsg() {
    return $('div.input_container__1yWID:nth-child(4) > p:nth-child(3)');
  }
  get returnButton() {
    return $('button.button_btn__3WL0L:nth-child(1)');
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
    return $('.modal_modalDivChildren__2FU_o > p:nth-child(1)');
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

  async updateSuperAdmin(firstname, lastname) {
    const elem = await $('button.button_btn__3WL0L:nth-child(2)');
    await this.setFirstName(firstname);
    await this.setLastName(lastname);
    await elem.scrollIntoView();
    await this.saveButton.click();
    await expect(this.modal).toBeDisplayed();
    await expect(this.titleModal).toBeDisplayed();
    await expect(this.titleModal).toHaveText('Admin Updated');
    await expect(this.textModal).toHaveText('Admin has been updated');
    await expect(this.modalOk).toBeDisplayed();
    await this.modalOk.click();
  }
  async updateSuperAdminFailed(firstname, lastname) {
    const elem = await $('button.button_btn__3WL0L:nth-child(2)');
    await this.setFirstName(firstname);
    await this.setLastName(lastname);
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
  async addSuperAdminFailed(firstname, lastname, email, password) {
    const elem = await $('button.button_btn__3WL0L:nth-child(2)');
    await this.setFirstName(firstname);
    await this.setLastName(lastname);
    await this.setEmail(email);
    await this.setPassword(password);
    await elem.scrollIntoView();
    await this.saveButton.click();
  }
}

module.exports = new superAdminForm();
