// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/index.js or similar

import "cypress-file-upload";
import "cypress-xpath";

// Optionally, you can add the following code to enable the XPath aliases (// and ..) globally:
Cypress.Commands.add("enableXpath", () => {
  Cypress.config("xpath", "true");
});

Cypress.Commands.add("login", (email, password) => {
  // cy.request({
  //   method: "POST",
  //   url: "https://api.onestoplms.com/qa/auth/authentication/signin",
  //   body: {
  //     medium: "email",
  //     emailOrPhone: "tanvir.hasan@shadhinlab.com",
  //     password: "maverick@07",
  //   },
  // }).then((resp) => {
  //   window.localStorage.setItem("myData", JSON.stringify(resp.body.data));
  // });

    cy.clearLocalStorage();
    cy.wait(1000)
    cy.visit("/");
    cy.get("#email").type(email);
    cy.get("#pass").type(password, { sensitive: true });
    cy.get(":nth-child(1) > .btn").click();
    cy.wait(1000)
    
});

Cypress.Commands.add("logout", () => {
    const accessToken = JSON.parse(
    window.localStorage.getItem("myData")
  ).accessToken;

  cy.request({
    method: "POST",
    url: "https://api.onestoplms.com/qa/auth/authentication/global-logout",
    body: {
      accessToken,
    },
  });
  cy.wait(1000);
});
