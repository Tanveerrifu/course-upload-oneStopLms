class LoginPage {
  userlogin(email, password) {
    cy.visit("/");
    // Check if the user is already on the dashboard page
    cy.url().then((url) => {
      if (url.includes("/dashboard")) {
        cy.wait(10000);
        cy.get(".c-avatar-img").click();
        cy.get(".dropdown-item").click();

        // User is on the dashboard, log out first
      }

      // Proceed with the login
      
      cy.get("#email").type(email);
      cy.get("#pass").type(password);
      cy.get(":nth-child(1) > .btn").click();
    });
  }
}

export default LoginPage;
