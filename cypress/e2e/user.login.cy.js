// cypress/e2e/spec.cy.js
import user from "../fixtures/user.json";
import { LMS_URLS } from "../helpers/lms_urls";
describe(
  "User can login with valid email and password",
  { testIsolation: false },
  () => {
    before(() => {
      let email, password;
      cy.fixture("user").then((userFixture) => {
        console.log(userFixture);
        email = userFixture.email;
        password = userFixture.password;
        cy.login(email, password);
      });
      cy.saveLocalStorage();
      cy.wait(1000);
    });
    it("1-Loggeed in User Can see Dashboard", () => {
      cy.visit(LMS_URLS.DASHBOARD);
      cy.contains("h3", "Welcome To Dashboard");
    });

    it("2-Loggeed in User Can see Dashboard", () => {
      cy.visit(LMS_URLS.HOME);
      cy.contains("h3", "Welcome To Dashboard");
    });

    it("3-Loggeed in User Can see Dashboard", () => {
      cy.visit(LMS_URLS.DASHBOARD);
      cy.contains("h3", "Welcome To Dashboard");
    });
    after(() => {
      cy.logout();
      cy.clearLocalStorage();
      // cy.removeLocalStorage("myData");
    });
  }
);
