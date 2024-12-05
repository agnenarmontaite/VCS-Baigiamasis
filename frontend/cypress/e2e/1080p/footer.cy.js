describe("checks footer functions and rendering", () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);
    cy.visit("http://localhost:5173/");
  });
  it("checks footer link home", () => {
    cy.get("div.footer-navigation-block")
      .find("a[href='/about?section=about']")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "About Us");
  });
  it("checks footer link terms of use", () => {
    cy.get("div.footer-navigation-block")
      .find("a[href='/about?section=terms']")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "Terms of Use");
  });
  it("checks footer link privacy policy", () => {
    cy.get("div.footer-navigation-block")
      .find("a[href='/about?section=privacy']")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "Privacy Policy");
  });
  it("checks footer link faq", () => {
    cy.get("div.footer-help-block")
      .find("a[href='/about?section=faq']")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "FAQ");
  });
  it("checks navbar link contact us", () => {
    cy.get("div.footer-help-block")
      .find("a[href='/contact']")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "Contact us");
  });
});
