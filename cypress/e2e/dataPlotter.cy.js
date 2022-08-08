describe("Data Plotter", () => {
  it("covers full user interaction with the app", () => {
    cy.visit("http://localhost:3000");
    cy.get(".PrivateSwitchBase-input-10").click();
    cy.get('[data-testid="text-area"]').clear();
    cy.get('[data-testid="text-area"]').type("api.bromleysat.space/api/data");
    cy.get('[data-testid="text-area-submit"]').click();
    cy.wait();
    cy.get(":nth-child(1) > .MuiInputBase-root > #demo-select-small").trigger(
      "mouseover"
    );
    cy.get(":nth-child(1) > .MuiInputBase-root > #demo-select-small").click();
    cy.get('[data-value="300000"]').click();
  });
});