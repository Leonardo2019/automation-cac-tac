/// <reference types='cypress'/>

describe('Automação Cac-tac', () => {
    before(() => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    })

    it('Acessar home', () => {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it("Preencha campos obrigárotios e envia formulário", () => {
        const longText = 'Teste, Teste,Teste, Teste,Teste, Teste,Teste, Teste,Teste, Teste,Teste, Teste,Teste, Teste,Teste, Teste,Teste, Teste,Teste, Teste,Teste, Teste,'
        cy.get('#firstName').type('Leonaro')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('leonardo@teste.com')
        cy.get('#open-text-area').type(longText, {delay: 0})

        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('E-mail com formatação inválida', () => {
        cy.get('#firstName').type('Leonaro')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('leonardo_teste.com')
        cy.get('#open-text-area').type('Teste')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone validação valor não númerico e continua vazio', () => {

        cy.get('#phone').type('asdasds').should('have.value', '')
    })

    it('Cmapo telefone obrigatório', () => {
        cy.get('#firstName').type('Leonaro')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('leonardo@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
})