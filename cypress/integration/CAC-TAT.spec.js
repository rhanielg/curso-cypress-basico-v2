/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('[class=button]').click();
        cy.get('span[class="error"]').should('be.visible');
    })

    it('validação telefone', () => {
        cy.get('[id=phone]').type('Texto').should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('[id=phone-checkbox]').check();

        cy.get('[id=firstName]').type('Teste');
        cy.get('[id=lastName]').type('Testando');
        cy.get('[id=email]').type('teste@testando.com');
        cy.get('[id=open-text-area]').type('Testando campo');

        cy.get('[class=button]').click();

        cy.get('span[class="error"]').should('be.visible');
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('[id=firstName]').type('Teste').should('have.value', 'Teste')
            .clear()
            .should('have.value', '');
        cy.get('[id=lastName]').type('Testando').should('have.value', 'Testando')
            .clear()
            .should('have.value', '');
        cy.get('[id=email]').type('teste@testando.com').should('have.value', 'teste@testando.com')
            .clear()
            .should('have.value', '');
        cy.get('[id=phone]').type('123456').should('have.value', '123456')
            .clear()
            .should('have.value', '');
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('[class=button]', 'Enviar').click();
        cy.get('span[class="error"]').should('be.visible');
    })

    it('envia o formulario com sucesso usando um comando customizado', function () {

        cy.fillMandatoryFieldsAndSubmit();

        cy.get('span[class="success"]').should('be.visible');
    })

    it('Seleção de produto por texto', function () {
        cy.get('[id=product]').select('YouTube').should('have.value', 'youtube');
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('[id=product]').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('[id=product]').select(1).should('have.value', 'blog')
    })

    it('input do tipo radio', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload').selectFile('./cypress/fixtures/example.json')
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um click', function() {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')

        cy.contains('#white-background', 'Talking About Testing').should('be.visible')
    })

})