/// <reference types='cypress'/>

describe('Automação Cac-tac', () => {
    
    before(() => {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    })

    beforeEach(() => {  
        cy.reload()
    })
   
    it('Acessar home', () => {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it("Preencha campos obrigárotios e envia formulário", () => {
        const longText = Cypress._.repeat('Teste, ', 10) 

        cy.get('#firstName').type('Leonardo').should('have.attr', 'type', 'text')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('leonardo@teste.com')
        cy.get('#open-text-area').type(longText, {delay: 0})

        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('E-mail com formatação inválida', () => {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('leonardo_teste.com')
        cy.get('#open-text-area').type('Teste')

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone validação valor não númerico e continua vazio', () => {

        cy.get('#phone').type('asdasds').should('have.value', '')
            .should('have.attr', 'type', 'number')
    })

    it('Validação Campo telefone obrigatório', () => {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Soares')
        cy.get('#email').type('leonardo@teste.com')
        cy.get('#phone-checkbox').check().should('have.attr', 'type', 'checkbox')
        cy.get('#open-text-area').type('Teste')

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa campo nome, sobrenome, email e telefone', () => {
        
        cy.get('#firstName').type('Leonardo').should('have.value', 'Leonardo')
            .clear().should('have.value', '')
        
        cy.get('#lastName').type('Soares').should('have.value', 'Soares')
            .clear().should('have.value', '')

        cy.get('#email').type('leonardo@teste.com').should('have.value', 'leonardo@teste.com')
            .clear().should('have.value', '')

        cy.get('#phone').type('11987654321').should('have.value', '11987654321')
            .clear().should('have.value', '')
        
        cy.get('#open-text-area').type('Teste,teste')
            .should('have.value', 'Teste,teste')
            .clear().should('have.value', '')
        
    })

    it('Mensagem de erro sem preencher campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('Comando customizados para testes de sucesso', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona na lista um produto por seu texto', () => {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor ', () => {
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu indice', () => {
        cy.get('#product').select([1])
            .should('have.value', 'blog')

    })

    it('Marca radio button (Feedback)', () => {
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback').and('have.attr', 'type', 'radio')
    })

    it('Marcar cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3).each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Marcar e desemarcar checkbox', () => {
        cy.get('input[type="checkbox"]').check()
        .last().should('be.checked')
        .uncheck().should('not.be.checked')
    })

    it('Seleciona e anexa arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
               expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input){
           expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo utilizando uma fixture utilizando alias', () => {
         
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name)
         })
      
    })

    it('Encontre o gato no site e altera texto', () => {
        cy.get('#cat').invoke('show')
            .should('be.visible')
        cy.get('#title').invoke('text', 'Altera texto')
        cy.get('#subtitle').invoke('text', 'Adicionar emoji 🐱‍🚀')
    })

    it('Utilizando select', () => {
        cy.get('#product').eq(0).select(2).should('be.visible')
        cy.get('[type="radio"]').eq(1).check().should('be.visible')
    })
    
})