const Page = require('../page');
class ProjectForm extends Page {
  get name() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/label');
  }
  get nameInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[1]/input');
  }
  get status() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/label');
  }
  get statusInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[2]/input');
  }
  get description() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/label');
  }
  get descriptionInpunt() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[1]/div[3]/input');
  }
  get employee() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div[1]/label');
  }
  get employeeSelect() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div[1]/div/select');
  }
  get rate() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div[2]/label');
  }
  get rateInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div[2]/input');
  }
  get role() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div[3]/label');
  }
  get roleSelect() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/div[3]/input');
  }

  get addEmployeeButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[2]/div/button');
  }
  get startDate() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[4]/div[1]/div/label');
  }
  get startDateInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[4]/div[1]/div/input');
  }
  get endDate() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[4]/div[2]/div/label');
  }
  get endDateInput() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[4]/div[2]/div/input');
  }

  get returnButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[5]/button[1]');
  }
  get saveButton() {
    return $('//*[@id="root"]/div/div/div[2]/div/form/div[5]/button[2]');
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
    return super.open('projecs/form');
  }
}

module.exports = new ProjectForm();
