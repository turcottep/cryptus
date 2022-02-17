/// <reference types="cypress" />
export {}

it("Can login.", () => {
    const username = Cypress.env("USERNAME")
    const password = Cypress.env("PASSWORD")
    cy.visit(Cypress.env("SITE_NAME"));
    cy.contains('Sign In').click()
    cy.get('#username').type(`${username}`)
    cy.get('#password').type(`${password}`)
    cy.get('#form > :nth-child(4) > .text-xl').click()
    cy.wait(5000)
    cy.get('.viewer_profile_name_container__3N915 > :nth-child(1)').should('have.text', 'test')
    cy.contains('Sign Out').click()
    cy.wait(3000)
    cy.contains('Sign In')
});