const Page = require('./page');

class AdminPage extends Page {


    open () {
        return super.open('admin');
    }
}

module.exports = new AdminPage();
