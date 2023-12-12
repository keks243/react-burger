describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "postOrder"
    );
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie("token", "test-accessToken");
  });
  it("passes", () => {
    const sourceCard = cy.get("#card");
    const sourceBun = cy.get("#bun");
    const targetBlock = cy.get("#constructor");
    sourceCard.trigger("dragstart");
    targetBlock.trigger("dragover").trigger("drop");
    sourceBun.trigger("dragstart");
    targetBlock.trigger("dragover").trigger("drop");
    cy.get("#orderBtn").click();
    cy.wait(1000);
    cy.get("#order-number").should("be.visible");
    cy.get("#closeBtn").click();
  });
});
