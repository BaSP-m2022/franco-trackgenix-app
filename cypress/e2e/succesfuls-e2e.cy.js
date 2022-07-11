describe.only('Login Succesfull e2e', () => {
  it('Open Login', () => {
    cy.visit('https://franco-trackgenix-app.vercel.app/home')
    cy.get('.header_userButton__1P-t6')
      .contains('Log in')
      .click()
  });
  it('Complete the forms', () => {
    cy.completeFields('admin@gmail.com', 'admin123')
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.login_buttonContainer__33RNj > button:nth-child(2)')
      .contains('Log In')
      .click()
  });
  it('Check we on the home', () => {
    cy.get('#root > div > header > div.header_buttonContainer__3oBWk > button:nth-child(1)')
      .contains('Hi');
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > section > h2')
      .contains('Home');
  });
})
describe('Singup Succesfull e2e', () => {
  it('Open Singup', () => {
    cy.visit('https://franco-trackgenix-app.vercel.app/home')
    cy.get('.header_userButton__1P-t6')
      .contains('Log in')
      .click()
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(3) > button')
      .contains('Sign up')
      .click()
  });
  it('Complete the Forms', () => {
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(1) > input')
      .type('Cypress')
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(2) > input')
      .type('Testing')
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(3) > input')
      .type('1998-10-10')
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(4) > input')
      .type('1234567')
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(5) > input')
      .type('cypress@gmail.com')
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(6) > input')
      .type('testing123')
    cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div.signup_buttonContainer__3diFg > button:nth-child(2)')
      .contains('Sign Up')
      .click()
  })
})