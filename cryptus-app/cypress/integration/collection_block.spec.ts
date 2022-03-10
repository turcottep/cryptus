/// <reference types="cypress" />
export {};

// Need to have functionning linked pages to test
it("should go to collection details", () => {
  const username = Cypress.env("USERNAME");
  const password = Cypress.env("PASSWORD");
  cy.visit(Cypress.env("SITE_NAME"));
  cy.contains("Sign In").click();
  cy.get("#username").type(`${username}`);
  cy.get("#password").type(`${password}`);
  cy.get("#form > :nth-child(4) > .text-xl").click();
  cy.wait(5000);
});
