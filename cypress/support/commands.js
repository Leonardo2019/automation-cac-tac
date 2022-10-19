
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Soares')
    cy.get('#email').type('leonardo@teste.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})