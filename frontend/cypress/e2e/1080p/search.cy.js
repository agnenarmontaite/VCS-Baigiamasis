describe("checks header functions and rendering", () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);
    cy.visit("http://localhost:5173/");
  });
  it("checks navbar link tools", () => {
    cy.get("header nav div")
      .find("a[href='/tools']")
      .click()
      .get("h3")
      .contains("Electric Routers")
      .click()
      .get("p")
      .contains("Elektrinė freza Makita RP2303FC07, 2100 W")
      .should("exist")
      .get("input[placeholder*='Search']")
      .type('900')
      .get("p")
      .should("not.contain.text", "Elektrinė freza Makita RP2303FC07, 2100 W")
      .should("contain.text", "Freza Makita, 900 W")
      .get('button span')
      .click()
      .get("p")
      .should("contain.text", "Generatorius benzininis Stanley SG 2400, 2100 W")
  });
});
