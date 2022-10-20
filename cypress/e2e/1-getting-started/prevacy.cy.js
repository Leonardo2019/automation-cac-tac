

it('Testar a página da politica de privacidade', () => {
           
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html')
 
    cy.contains('Talking About Testing').should('be.visible')
         
 })