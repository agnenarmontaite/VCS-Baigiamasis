describe("checks contact us page functions and rendering", () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);
    cy.visit("http://localhost:5173/");
    cy.get("header nav div")
      .find("a[href='/login']")
      .click()
      .get("form")
      .find("input[type='email']")
      .should("exist")
      .type("adis@adonis2.com")
      .get("form")
      .find("input[type='password']")
      .should("exist")
      .type("Adis123!")
      .get("form")
      .find("button")
      .click()
      .get("header nav div span")
      .should("contain.text", "Welcome, Adis!")
  });
  it("navigates to contact page and tries to send a message", () => {
    cy.get("header nav div")
      .find("a[href='/contact']")
      .click()
      .get("h1")
      .should("exist")
      .should("contain.text", "Contact us")
      .get("form")
      .find('input[type="email"]')
      .type("adis@adonis2.com")
      .get("form")
      .find('input[type="tel"]')
      .type("+12345678998")
      .get("form")
      .find('textarea')
      .type("this is cypress test")
      .get("form")
      .find('button[type="submit"]')
      .click()
      .get('div.Toastify div div div div')
      .should("exist")
      .should("not.contain.text", "Failed")
      .and('contain.text', 'successfully')

  });
});
