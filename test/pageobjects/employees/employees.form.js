const Page = require('../page');

class EmployeeForm extends Page {
  get employeeTitle() {
    return $('//*[@id="root"]/div/div/div[2]/div/h2');
  }
  get firstName() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/label');
  }

  get firstNameInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/input');
  }
  get lastName() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/label');
  }

  get lastNameInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/input');
  }
  get DateOfBirth() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/label');
  }

  get DateOfBirthInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/input');
  }
  get Dni() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/label');
  }

  get DniInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[4]/input');
  }
  get email() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[5]/label');
  }

  get emailInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[5]/input');
  }
  get password() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[6]/label');
  }

  get passwordInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[6]/input');
  }
  get returnButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[1]');
  }

  get saveButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/button[2]');
  }

  open() {
    return super.open('employees/form');
  }
}

module.exports = new EmployeeForm();
