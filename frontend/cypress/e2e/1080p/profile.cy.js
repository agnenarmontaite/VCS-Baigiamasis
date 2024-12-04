describe("checks profile dashboard functions and rendering", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
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
          .should("contain.text", "Welcome");
     
    });
    it("goes to profile dashboard and tries to change user name", () => {
        cy.get("header nav div")
        .find("a[href='/profile']")
        .click()
        .get("h2")
        .should("exist")
        .should("contain.text", "Profile Dashboard")
        .get("div div.container div.grid a")
        .contains('Profile Details')
        .click()
        .get("div div.container div h2")
        .should("contain.text", "Profile Details")
        .get('form')
        .find('input[value="Adis"]')
        .type('test')
        .get("form")
        .find('button[type="submit"]')
        .click()
        .get("header nav div span")
        .should("contain.text", "Welcome, Adistest!")
        .get('form')
        .find('input[value="Adistest"]')
        .clear()
        .type('Adis')
        .get("form")
        .find('button[type="submit"]')
        .click()
        .get("header nav div span")
        .should("contain.text", "Welcome, Adis!")

    });
    // it("tries to log in, checks home page for relevant navbar changes", () => {
    //   cy.get("header nav div")
    //   .find("a[href='/login']")
    //     .click()
    //     .get("form")
    //     .find("input[type='email']")
    //     .should("exist")
    //     .type("adis@adonis2.com")
    //     .get("form")
    //     .find("input[type='password']")
    //     .should("exist")
    //     .type("Adis123!")
    //     .get("form")
    //     .find("button")
    //     .click()
    //     .get("header nav div span")
    //     .should("contain.text", "Welcome, Adis!");
    // });
  });
  