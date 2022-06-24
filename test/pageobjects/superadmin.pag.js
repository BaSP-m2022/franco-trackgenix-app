const Page = require('./page');

class SuperAdminsPage extends Page {


    open () {
        return super.open('super-admins');
    }
}

module.exports = new SuperAdminsPage();
