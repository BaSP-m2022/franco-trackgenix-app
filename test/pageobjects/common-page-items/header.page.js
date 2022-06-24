const Page = require('../page');

class Header extends Page {

  get title () {return $('#title')};
  get rrLogo () {return $('#logo')};

}

module.exports = new Header();