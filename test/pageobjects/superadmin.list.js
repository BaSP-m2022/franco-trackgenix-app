const Page = require('./page');

class SuperAdminsPage extends Page {
  get addSuperAdmin() {
    return $('.button_btn__3WL0L');
  }
  get searchInput() {
    return $('#header-search');
  }
  get superAdminTitle() {
    return $('.super-admins_containerSuperAdmin__Guysa > h2:nth-child(1)');
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
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]/button[1]');
  }
  get superAdmin1DeleteButton() {
    return $('//*[@id="root"]/div/div/div[2]/section/table/tbody/tr[1]/td[5]/button[2]');
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
  get modalYes() {
    return $('.button_delete__30eE3');
  }
  get modalNo() {
    return $('button.button_btn__3WL0L:nth-child(2)');
  }

  async setSearchFirstName(firstname) {
    await this.searchInput.setValue(firstname);
  }

  async deleteSuperAdmin() {
    await this.superAdmin1DeleteButton.click();
    await expect(this.modal).toBeDisplayed();
    await expect(this.titleModal).toBeDisplayed();
    await expect(this.titleModal).toHaveText('Super Admins');
    await expect(this.textModal).toBeDisplayed();
    await expect(this.textModal).toHaveText('Are you sure to delete a Super Admin?');
    await expect(this.modalX).toBeDisplayed();
    await expect(this.modalYes).toBeDisplayed();
    await expect(this.modalNo).toBeDisplayed();
    await expect(this.modalX).toBeClickable;
    await expect(this.modalYes).toBeClickable();
    await expect(this.modalNo).toBeClickable();
    await this.modalNo.click();
  }

  open() {
    return super.open('super-admins');
  }
}

module.exports = new SuperAdminsPage();