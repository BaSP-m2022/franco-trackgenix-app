const Page = require('./page');

class HomePage extends Page {
  open() {
    return super.open('home');
  }
}

module.exports = new HomePage();
