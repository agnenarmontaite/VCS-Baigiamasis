describe("checks header functions and rendering", () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);
    cy.visit("http://localhost:5173/");
  });
  it("checks navbar link home", () => {
    cy.visit("http://localhost:5173/about")
      .get("header nav div")
      .find("a[href='/']")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "Discover Your");
  });
  it("checks navbar link tools", () => {
    cy.get("header nav div")
      .find("a[href='/tools']")
      .click()
      .get("h3")
      .should("exist")
      .should("contain.text", "Generators")
  });
  it("checks navbar link about us", () => {
    cy.get("header")
      .find("a[href='/about']")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "About Us")
      .get("ul li")
      .contains("Terms of Use")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "Terms of Use")
      .get("ul li")
      .contains("Privacy Policy")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "Privacy Policy")
      .get("ul li")
      .contains("FAQ")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "FAQ");
  });
  it("checks navbar link contact us", () => {
    cy.get("header nav div")
      .find("a[href='/contact']")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "Contact us");

  });
});
