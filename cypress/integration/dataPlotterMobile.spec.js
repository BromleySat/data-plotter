/* eslint-disable cypress/no-unnecessary-waiting */
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
    it("tests toggling local storage", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get('.MuiButtonBase-root > [type="checkbox"]').should(
        "not.be.checked"
      );
      cy.get('.MuiButtonBase-root > [type="checkbox"]').realTouch();
      cy.get('.MuiButtonBase-root > [type="checkbox"]').should("be.checked");
      cy.get('.MuiButtonBase-root > [type="checkbox"]').realTouch();
      cy.get('.MuiButtonBase-root > [type="checkbox"]').should(
        "not.be.checked"
      );
    });
    it("tests displaying the textfield and update button", () => {
      cy.get('[data-testid="text-area"]').should("be.visible");
      cy.get('[data-testid="text-area"]').should(
        "have.value",
        "api.bromleysat.space"
      );
      cy.get('[data-testid="text-area"]').should(
        "have.attr",
        "data-testid",
        "text-area"
      );
      cy.get('[data-testid="text-area-submit"]').should("be.visible");
      cy.get('[data-testid="text-area-submit"]').should("have.text", "Update");
      cy.get('[data-testid="text-area-submit"]').should(
        "have.attr",
        "type",
        "submit"
      );
    });
    it("tests switching to light mode", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get('[data-testid="dark-theme-toggle"]').should("be.visible");
      cy.get('[data-testid="dark-theme-toggle"]').realTouch();
    });
    it("tests switching to dark mode", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get('[data-testid="dark-theme-toggle"]').should("be.visible");
      cy.get('[data-testid="dark-theme-toggle"]').realTouch();
      cy.get('[data-testid="dark-theme-toggle"]').realTouch();
    });
    it("tests displaying tooltip when user clicks away", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get(
        '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).realTouch();
      cy.get(
        '[data-testid="data-retention-5s-https://api.bromleysat.space/api/data"]'
      ).realTouch();
      cy.get(".MuiContainer-root").realTouch();
      cy.get(
        '[data-testid="data-retention-tooltip-https://api.bromleysat.space/api/data"]'
      ).should("be.visible");
    });

    it("tests changing data retention value", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get(
        '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).should("be.visible");
      cy.get(
        '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).should("have.text", "21d");
      cy.get(
        '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).realTouch();
      cy.get(
        '[data-testid="data-retention-5s-https://api.bromleysat.space/api/data"]'
      ).realTouch();
      cy.get(".MuiContainer-root").realTouch();
    });
    it("tests changing refresh rate value", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get(
        '[data-testid="refresh-rate-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).should("be.visible");
      cy.get(
        '[data-testid="refresh-rate-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).should("have.text", "1s");
      cy.get(
        '[data-testid="refresh-rate-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).realTouch();
      cy.get(
        '[data-testid="refresh-rate-15s-https://api.bromleysat.space/api/data"]'
      ).realTouch();
      cy.get(".MuiContainer-root").realTouch();
    });
    it("tests changing chart time window value", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get(
        '[data-testid="chart-time-window-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).should("be.visible");
      cy.get(
        '[data-testid="chart-time-window-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).should("have.text", "5m");
      cy.get(
        '[data-testid="chart-time-window-https://api.bromleysat.space/api/data"] > #demo-select-small'
      ).realTouch();
      cy.get(
        '[data-testid="chart-time-window-21d-https://api.bromleysat.space/api/data"]'
      ).realTouch();
      cy.get(".MuiContainer-root").realTouch();
    });
    it("tests zooming in and out functionality", () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.get(".recharts-wrapper").should("be.visible");
      cy.get(
        '[data-testid="zoom-out-https://api.bromleysat.space/api/data"]'
      ).should("be.visible");
      cy.wait(30000);
      cy.get(".recharts-wrapper").drag(".recharts-wrapper", {
        source: { x: 100, y: 100 },
        target: { x: 300, y: 20 },
        force: true,
      });
      cy.get(".recharts-wrapper").realTouch();
      cy.wait(5000);
      cy.get(
        '[data-testid="zoom-out-https://api.bromleysat.space/api/data"]'
      ).realTouch();
      cy.wait(5000);
    });
  });
});
