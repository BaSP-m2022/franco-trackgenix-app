
describe('Wrong login e2e', () => {
  it('Open Login', () => {
    cy.visit('https://franco-trackgenix-app.vercel.app/home')
    cy.get('.header_userButton__1P-t6')
      .contains('Log in')
      .click()
  });
  it('Try to login', () => {
    cy.completeFields('false@fail.com', 'admin123')
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.login_buttonContainer__33RNj > button:nth-child(2)')
    .contains('Log In')
    .click()
  });
  it('Modal should be displayed', () => {
    const modal = cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div')
    expect(modal).to.exist
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > div > div > div.modal_modalDivTitle__3Te57 > h3')
      .contains('Login error')
  });
  it('Change values', () => {
    cy.visit('https://franco-trackgenix-app.vercel.app/login')
    cy.completeFields('a', 'falsepass')
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.login_buttonContainer__33RNj > button:nth-child(2)')
    .click()
  });
  it('Check error msjs', () => {
    const emailError = cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(1) > p')
    emailError.contains('The email is invalid')
    const emailInput =   cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(1) > input')
    emailInput.clear()
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(1) > p')
      .contains('"email" is not allowed to be empty')
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(2) > input')
      .clear()
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(2) > p')
      .contains('"password" is not allowed to be empty')
  });
});