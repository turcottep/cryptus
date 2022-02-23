/// <reference types="cypress" />;
export {};

it("Can signup.", () => {
  cy.visit("http://localhost:3000/signup");
  cy.get("#email").type("tester@test.com");
  cy.get("#password").type("TestLogin");
  cy.get("#confirmpassword").type("TestLogin");
  cy.contains("I have read and accept the terms").click();
  cy.contains("Sign up").click();
  cy.wait(7000);
  cy.contains("Metamask").should("have.text", "Metamask");
});
