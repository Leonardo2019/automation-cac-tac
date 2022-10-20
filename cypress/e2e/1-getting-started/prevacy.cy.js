

Cypress._.times(5, () => {
    
it('Testar a página da politica de privacidade e repetir 5 vezes', () => {
           
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html')
 
    cy.contains('Talking About Testing').should('be.visible')
         
 })
})
