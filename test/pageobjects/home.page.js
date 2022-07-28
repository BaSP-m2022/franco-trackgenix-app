const Page = require('./page');

class HomePage extends Page {
  get loginButton() {
    return $('//*[@id="root"]/div/header/button');
  }
  open() {
    return super.open('home');
  }
}

module.exports = new HomePage();
