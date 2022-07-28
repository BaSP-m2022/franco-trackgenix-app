class Footer {
  get locationText() {
    return $('.footer_p1__3InaG');
  }
  get copyText() {
    return $('.footer_p2__3m85A');
  }
  get linkedInIcon() {
    return $('.footer_rowLinks__3sOXe > a:nth-child(1)');
  }
  get twiterIcon() {
    return $('.footer_rowLinks__3sOXe > a:nth-child(2)');
  }
  get facebookIcon() {
    return $('.footer_rowLinks__3sOXe > a:nth-child(3)');
  }
  get instagramIcon() {
    return $('.footer_rowLinks__3sOXe > a:nth-child(4)');
  }
  get githubIcon() {
    return $('.footer_rowLinks__3sOXe > a:nth-child(5)');
  }
}

module.exports = new Footer();
