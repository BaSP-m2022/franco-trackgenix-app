const Page = require('./page');
class SignUp extends Page {
  get formTitle() {
    return $('.signupemployee_formTitle__2wf0O');
  }
  get firstNameTitleInput() {
    return $('div.input_container__1yWID:nth-child(1) > label:nth-child(1)');
  }
  get firstNameInput() {
    return $('div.input_container__1yWID:nth-child(1) > input:nth-child(2)');
  }
  get firtNameMsg() {
    return $('div.input_container__1yWID:nth-child(1) > p:nth-child(3)');
  }
  get lastNameTitleInput() {
    return $('div.input_container__1yWID:nth-child(2) > label:nth-child(1)');
  }
  get lastNameInput() {
    return $('div.input_container__1yWID:nth-child(2) > input:nth-child(2)');
  }
  get lastnameMsg() {
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
    return $('div.input_container__1yWID:nth-child(6) > label:nth-child(2)');
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

  open() {
    return super.open('employee/signup');
  }
}

module.exports = new SignUp();
