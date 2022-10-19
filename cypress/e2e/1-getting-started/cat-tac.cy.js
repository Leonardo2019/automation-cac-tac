/// <reference types='cypress'/>

describe('Automação Cac-tac', () => {
    
    it('Acessar home', () => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    })
})