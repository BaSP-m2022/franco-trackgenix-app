const Page = require('../page');

class Footer extends Page {

  get locationText () {return $('.footer_p1__3InaG')};
  get copyText () {return $('.footer_p2__3m85A')};
  get linkedInIcon () {return $('//*[@id="root"]/div/footer/div[2]/nav/a[1]')};
  get twiiterIcon () {return $('//*[@id="root"]/div/footer/div[2]/nav/a[2]')};
  get facebookIcon () {return $('//*[@id="root"]/div/footer/div[2]/nav/a[3]')};
  get instagramIcon () {return $('//*[@id="root"]/div/footer/div[2]/nav/a[4]')};
  get githubIcon () {return $('//*[@id="root"]/div/footer/div[2]/nav/a[5]')};

}

module.exports = new Footer();