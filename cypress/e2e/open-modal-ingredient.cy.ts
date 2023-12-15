describe("Drag and Drop Test", () => {
  it("Should drag and drop a block", () => {
    cy.visit("/");

    cy.get("#card").click();

    cy.get("#modal-name").should("be.visible");

    cy.get("#modal-calories").should("be.visible");

    cy.get("#modal-proteins").should("be.visible");

    cy.get("#modal-fat").should("be.visible");

    cy.get("#modal-carbohydrates").should("be.visible");

    cy.get("#closeBtn").click();
  });
});
