Cypress.Commands.add('completeFields', (email, password) => {
  cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(1) > input')
    .type(email)
  cy.get('#root > div > div > div.layout_divSwitch__2iaq7 > div > form > div:nth-child(1) > div:nth-child(2) > input')
    .type(password)

})

