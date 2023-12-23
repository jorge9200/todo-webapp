describe("Testing Jorge's App", () => {
  it("Checks home page and try to access todo page without login", () => {
    cy.visit("localhost:3000");
    cy.get("h1").should("contain", "Hello there");
    cy.get("#navbar-menu").should("contain", "Login");
    cy.get("#navbar-menu").should("contain", "Register");
    cy.visit("localhost:3000/todo");
    cy.get("h1").should("contain", "Login");
  });

  /* This test is hidden because login is bypassed and it always works (Exercise requirements)
  it("Checks wrong login and show todo page", () => {
    cy.visit("localhost:3000/login");
    cy.get("input[type=email]").type("test@gmail.com");
    cy.get("input[type=password]").type("1234");
    cy.get("button[type=submit]").click();
    cy.get(".alert.alert-error").should("be.visible");
  });
  */

  it("Checks correct login and show todo page", () => {
    cy.visit("localhost:3000/login");
    cy.get("input[type=email]").type("jorge92f@gmail.com");
    cy.get("input[type=password]").type("1234");
    cy.get("button[type=submit]").click();
    cy.get("h1").should("contain", "To-Do List");
  });

  it("Checks toDo app works properly", () => {
    cy.visit("localhost:3000/login");
    cy.get("input[type=email]").type("jorge92f@gmail.com");
    cy.get("input[type=password]").type("1234");
    cy.get("button[type=submit]").click();
    cy.get("h1").should("contain", "To-Do List");
    // Test create toDo
    cy.get("button#addToDoButton").click();
    cy.get(".newToDo input[type=text]").type("Learn to use Next.Js");
    cy.get(".newToDo button").click();
    cy.get("table").should("contain", "Learn to use Next.Js");
    // Test edit toDo
    cy.get("#editToDoButton").click();
    cy.get(".editToDo input[type=text]").type("Learn to use Cypress");
    cy.get(".editToDo button").click();
    cy.get("table").should("contain", "Learn to use Cypress");
    // Test complete toDo
    cy.get("input[type=checkbox]").should("not.be.checked");
    cy.get("input[type=checkbox]").click();
    cy.get("input[type=checkbox]").should("be.checked");
    // Test data persist
    cy.reload();
    cy.get("table").should("contain", "Learn to use Cypress");
    cy.get("input[type=checkbox]").should("be.checked");
    // Test remove toDo
    cy.get("table").should("exist");
    cy.get("#removeToDoButton").click();
    cy.get(".removeToDo button.btn-neutral").click();
    cy.get("table").should("not.exist");
    // Test data persist
    cy.reload();
    cy.get("table").should("not.exist");
  });

  it("Checks register new user", () => {
    cy.visit("localhost:3000/register");
    cy.get("input[type=email]").type(`test-user-${Math.random()}@gmail.com`);
    cy.get("input[type=password]").type(`pass-${Math.random()}`);
    cy.get("button[type=submit]").click();
    cy.get("h1").should("contain", "To-Do List");
  });
});
