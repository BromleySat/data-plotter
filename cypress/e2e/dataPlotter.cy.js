const sizes = ["iphone-6", "ipad-2", [1024, 768]];

describe("Data Plotter", () => {
  sizes.forEach((size) => {
    it("covers full user interaction with the app", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.visit("http://localhost:3000");
      cy.get(".PrivateSwitchBase-input-10").click();
      cy.get('[data-testid="text-area"]').clear();
      cy.get('[data-testid="text-area"]').type("localhost:3080/api/data");
      cy.get('[data-testid="text-area-submit"]').click();
      cy.wait(5000);
      cy.get(":nth-child(1) > .MuiInputBase-root > #demo-select-small").trigger(
        "mouseover"
      );
      cy.get(":nth-child(1) > .MuiInputBase-root > #demo-select-small").click();
      cy.get('[data-value="300000"]').click();
      cy.get(
        '[style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;"] > .MuiFormControl-root > .MuiInputBase-root > #demo-select-small'
      ).click();
      cy.get('[data-value="300000"]').click();
      cy.get(".PrivateSwitchBase-input").click();
      cy.get(
        ".split > .MuiFormControl-root > .MuiInputBase-root > #demo-select-small"
      ).click();
      cy.get('[data-value="10000"]').click();
      cy.get('[data-testid="text-area"]').type(
        ",api.bromleysat.space/api/data"
      );
      cy.get('[data-testid="text-area-submit"]').click();
    });
  });
});
