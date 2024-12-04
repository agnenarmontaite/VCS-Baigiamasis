describe("checks various pages accesability proper authorization", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      cy.visit("http://localhost:5173/")
    });
    it("tries to place a reservation without logging in", () => {
      cy.get("header nav div")
        .find("a[href='/tools']")
        .click()
        .get("h3")
        .should("exist")
        .should("contain.text", "Generators")
        .get("div div div div div div")
        .find("a[href^='/tools']")
        .first()
        .click()
        .get("a")
        .contains("reservation")
        .click()
        .get("form")
        .find("input[type='email']")
        .should("exist")
    });
  });
  
  