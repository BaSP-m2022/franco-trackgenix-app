const Page = require('../page');

class EmployeesPage extends Page {


    open () {
        return super.open('super-admins');
    }
}

module.exports = new EmployeesPage();
