Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('[id=firstName]').type('Teste');
    cy.get('[id=lastName]').type('Testando');
    cy.get('[id=email]').type('teste@testando.com');
    cy.get('[id=open-text-area]').type('Testando campo');
    cy.get('[class=button]').click();
})