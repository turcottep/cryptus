/// <reference types="cypress" />
export {}

it("Can login.", () => {
    const username = Cypress.env("USERNAME")
    const password = Cypress.env("PASSWORD")
    cy.visit("http://localhost:3000/");
    cy.contains('Sign In').click()
    cy.get('#username').type(`${username}`)
    cy.get('#password').type(`${password}`)
    cy.contains('Log in').click()
    cy.wait(5000)
    cy.contains('NFTTestLogin').should('have.text', 'NFTTestLogin')
    cy.contains('Sign Out').click()
    cy.wait(3000)
    cy.contains('Sign In')
});