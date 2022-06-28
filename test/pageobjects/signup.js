const Page = require('./page');
class SignUp extends Page {
  get formTitle() {
    return $('.signupemployee_formTitle__2wf0O');
  }
  get table() {
    return $('.signupemployee_containerSec__3rZvY');
  }
  get firstNameTitleInput() {
    return $('div.input_container__1yWID:nth-child(1) > label:nth-child(1)');
  }
  get firstNameInput() {
    return $('div.input_container__1yWID:nth-child(1) > input:nth-child(2)');
  }
  get firstNameMsg() {
    return $('div.input_container__1yWID:nth-child(1) > p:nth-child(3)');
  }
  get lastNameTitleInput() {
    return $('div.input_container__1yWID:nth-child(2) > label:nth-child(1)');
  }
  get lastNameInput() {
    return $('div.input_container__1yWID:nth-child(2) > input:nth-child(2)');
  }
  get lastNameMsg() {
    return $('div.input_container__1yWID:nth-child(2) > p:nth-child(3)');
  }
  get dobTitleInput() {
    return $('div.input_container__1yWID:nth-child(3) > label:nth-child(1)');
  }
  get dobInput() {
    return $('div.input_container__1yWID:nth-child(3) > input:nth-child(2)');
  }
  get dobMsg() {
    return $('div.input_container__1yWID:nth-child(3) > p:nth-child(3)');
  }
  get dniTitleInput() {
    return $('div.input_container__1yWID:nth-child(4) > label:nth-child(1)');
  }
  get dniInput() {
    return $('div.input_container__1yWID:nth-child(4) > input:nth-child(2)');
  }
  get dniMsg() {
    return $('div.input_container__1yWID:nth-child(4) > p:nth-child(3)');
  }
  get emailTitleInput() {
    return $('div.input_container__1yWID:nth-child(5) > label:nth-child(1)');
  }
  get emailInput() {
    return $('div.input_container__1yWID:nth-child(5) > input:nth-child(2)');
  }
  get emailMsg() {
    return $('div.input_container__1yWID:nth-child(5) > p:nth-child(3)');
  }
  get passTitleInput() {
    return $('div.input_container__1yWID:nth-child(6) > label:nth-child(1)');
  }
  get passInput() {
    return $('/html/body/div/div/div/div[2]/div/form/div[1]/div[6]/input');
  }
  get passwordMsg() {
    return $('div.input_container__1yWID:nth-child(6) > p:nth-child(3)');
  }
  get returnButton() {
    return $('.signupemployee_buttonContainer__14MnT > button:nth-child(1)');
  }
  get signUpButton() {
    return $('button.button_btn__3WL0L:nth-child(2)');
  }
  get logInButton() {
    return $('.signupemployee_form__2j_cO > div:nth-child(3) > button:nth-child(1)');
  }
  get modal() {
    return $('.modal_modalWrapper__2oAER');
  }
  get titleModal() {
    return $('.modal_modalDivTitle__3Te57 > h3:nth-child(1)');
  }
  get textModal() {
    return $('.modal_modalDivChildren__2FU_o > p:nth-child(1)');
  }
  get modalX() {
    return $('.modal_closeButton__191FP');
  }
  get modalOk() {
    return $('.modal_modalDivChildren__2FU_o > div:nth-child(2) > button:nth-child(1)');
  }

  async setFirstName(firstname) {
    await this.firstNameInput.setValue(firstname);
  }
  async setLastName(lastname) {
    await this.lastNameInput.setValue(lastname);
  }
  async setDOB(DOB) {
    await this.dobInput.setValue(DOB);
  }
  async setDNI(DNI) {
    await this.dniInput.setValue(DNI);
  }
  async setEmail(email) {
    await this.emailInput.setValue(email);
  }
  async setPassword(password) {
    await this.passInput.setValue(password);
  }

  open() {
    return super.open('employee/signup');
  }

  async signup(firstname, lastname, DOB, DNI, email, password) {
    const elem = await $('button.button_btn__3WL0L:nth-child(2)');
    await this.setFirstName(firstname);
    await this.setLastName(lastname);
    await this.setDOB(DOB);
    await this.setDNI(DNI);
    await this.setEmail(email);
    await this.setPassword(password);
    await elem.scrollIntoView();
    await this.signUpButton.click();
    await expect(this.modal).toBeDisplayed();
    await expect(this.titleModal).toBeDisplayed();
    await expect(this.titleModal).toHaveText('Employee Sign Up');
    await expect(this.textModal).toHaveText('Employee created successfully!');
    await expect(this.modalX).toBeDisplayed();
    await expect(this.modalOk).toBeDisplayed();
    await expect(this.modalX).toBeClickable;
    await this.modalX.click();
    await this.signUpButton.click();
    await this.modalOk.click();
  }

  async signupFailed(firstname, lastname, DOB, DNI, email, password) {
    const elem = await $('button.button_btn__3WL0L:nth-child(2)');
    await this.setFirstName(firstname);
    await this.setLastName(lastname);
    await this.setDOB(DOB);
    await this.setDNI(DNI);
    await this.setEmail(email);
    await this.setPassword(password);
    await elem.scrollIntoView();
    await this.signUpButton.click();
  }
}

module.exports = new SignUp();
