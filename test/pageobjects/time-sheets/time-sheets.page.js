const Page = require('../page');

class TimeSheetsPage extends Page {


    open () {
        return super.open('time-sheets');
    }
}

module.exports = new TimeSheetsPage();