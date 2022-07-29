const Page = require('./page');

class SuperAdminsPage extends Page {
  get addSuperAdmin() {
    return $('.button_btn__3WL0L');
  }
  get searchInput() {
    return $('#header-search');
  }
  get crossSearch() {
    return $('.search_flatSearch__3FK6N > button:nth-child(2)');
  }
  get superAdminTitle() {
    return $('.list_container__2s9y8 > h2:nth-child(1)');
  }
  get table() {
    return $('.table_tableMain__1saoQ');
  }
  get tableHead() {
    return $('.table_tableMain__1saoQ > thead:nth-child(1) > tr:nth-child(1)');
  }
  get superAdmin1FirstName() {
    return $('tr.table_containerTable__v3dkK:nth-child(1) > td:nth-child(1)');
  }
  get superAdmin1LastName() {
    return $('tr.table_containerTable__v3dkK:nth-child(1) > td:nth-child(2)');
  }
  get superAdmin1Email() {
    return $('tr.table_containerTable__v3dkK:nth-child(1) > td:nth-child(3)');
  }
  get superAdmin1Id() {
    return $('tr.table_containerTable__v3dkK:nth-child(1) > td:nth-child(4)');
  }
  get superAdmin1EditButton() {
    return $(
      'tr.table_containerTable__v3dkK:nth-child(1) > td:nth-child(4) > div:nth-child(1) > button:nth-child(1) > svg:nth-child(1)'
    );
  }
  get superAdmin1DeleteButton() {
    return $(
      'tr.table_containerTable__v3dkK:nth-child(1) > td:nth-child(4) > div:nth-child(1) > button:nth-child(2) > svg:nth-child(1)'
    );
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
  get modalYes() {
    return $('.button_delete__30eE3');
  }
  get modalNo() {
    return $('button.button_btn__3WL0L:nth-child(2)');
  }
  get login() {
    return $('li.NavLink_items__197Te:nth-child(2) > a:nth-child(1)');
  }
  get emailInput() {
    return $('div.input_container__1yWID:nth-child(1) > input:nth-child(2)');
  }
  get passwordInput() {
    return $('div.input_container__1yWID:nth-child(2) > input:nth-child(2)');
  }
  get btnLogin() {
    return $('button.button_btn__3WL0L:nth-child(2)');
  }

  async setSearchFirstName(firstname) {
    await this.searchInput.setValue(firstname);
  }

  async setEmail(email) {
    await this.emailInput.setValue(email);
  }
  async setPassword(password) {
    await this.passwordInput.setValue(password);
  }

  async loginSA(email, password) {
    await this.login.click();
    await this.setEmail(email);
    await this.setPassword(password);
    await this.btnLogin.click();
  }

  async deleteSuperAdmin() {
    await this.superAdmin1DeleteButton.click();
    await expect(this.modal).toBeDisplayed();
    await expect(this.titleModal).toBeDisplayed();
    await expect(this.titleModal).toHaveText('Admins');
    await expect(this.textModal).toBeDisplayed();
    await expect(this.textModal).toHaveText('Are you sure to delete an admin?');
    await expect(this.modalYes).toBeDisplayed();
    await expect(this.modalNo).toBeDisplayed();
    await expect(this.modalYes).toBeClickable();
    await expect(this.modalNo).toBeClickable();
    await this.modalNo.click();
  }
}

module.exports = new SuperAdminsPage();
