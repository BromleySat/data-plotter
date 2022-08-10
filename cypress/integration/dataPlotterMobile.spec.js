const sizes = ["iphone-xr", "samsung-note9"];

describe("Data Plotter Testing Features On Touch Devices", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000", {
      onBeforeLoad: (win) => {
        win.ontouchstart = true;
      },
    });
    cy.wait(12000);
  });
  afterEach(() => {
    cy.wait(3000);
  });
  sizes.forEach((size) => {
    it("tests switching to light mode", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get('[data-testid="dark-theme-toggle"]').click();
    });
    it("tests switching to dark mode", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get('[data-testid="dark-theme-toggle"]').click();
      cy.get('[data-testid="dark-theme-toggle"]').click();
    });
    it("tests displaying tooltip when user clicks away", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get(
        '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).click();
      cy.get(
        '[data-testid="data-retention-5s-https://api.bromleysat.space/api/data"]'
      ).click();
      cy.get(".MuiContainer-root").click();
    });
    it("tests toggling local storage", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get(
        '[data-testid="local-storage-https://api.bromleysat.space/api/data"]'
      ).click();
    });
    it("tests changing data retention value", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get(
        '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).click();
      cy.get(
        '[data-testid="data-retention-5s-https://api.bromleysat.space/api/data"]'
      ).click();
      cy.get(".MuiContainer-root").click();
    });
    it("tests changing refresh rate value", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get(
        '[data-testid="refresh-rate-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).click();
      cy.get(
        '[data-testid="refresh-rate-15s-https://api.bromleysat.space/api/data"]'
      ).click();
      cy.get(".MuiContainer-root").click();
    });
    it("tests changing chart time window value", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get(
        '[data-testid="chart-time-window-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).click();
      cy.get(
        '[data-testid="chart-time-window-21d-https://api.bromleysat.space/api/data"]'
      ).click();
      cy.get(".MuiContainer-root").click();
    });
  });
});
