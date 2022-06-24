class AdminForm extends AdminPage {

  open () {
      return super.open('admins/form');
}
}

module.exports = new AdminForm();