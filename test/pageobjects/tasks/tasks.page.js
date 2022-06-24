const Page = require('../page');

class Tasks extends Page {


    open () {
        return super.open('tasks');
    }
}

module.exports = new Tasks();