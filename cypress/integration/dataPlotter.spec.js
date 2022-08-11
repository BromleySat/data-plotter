describe("Data Plotter Testing Features", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.wait(12000);
  });
  afterEach(() => {
    cy.wait(3000);
  });
  it("tests displaying the textfield and update button", () => {
    cy.get('[data-testid="text-area"]').should("be.visible");
    cy.get('[data-testid="text-area"]').should(
      "have.value",
      "api.bromleysat.space/api/data"
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
    cy.get('[data-testid="dark-theme-toggle"]').should("be.visible");
    cy.get('[data-testid="dark-theme-toggle"]').realClick();
  });
  it("tests switching to dark mode", () => {
    cy.get('[data-testid="dark-theme-toggle"]').should("be.visible");
    cy.get('[data-testid="dark-theme-toggle"]').realClick();
    cy.get('[data-testid="dark-theme-toggle"]').realClick();
  });
  it("tests displaying tooltip on hover", () => {
    cy.get(
      '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).trigger("mouseover");
    cy.get(
      '[data-testid="data-retention-tooltip-https://api.bromleysat.space/api/data"]'
    ).should("be.visible");
  });
  it("tests toggling local storage", () => {
    cy.get(
      '[data-testid="local-storage-https://api.bromleysat.space/api/data"]'
    ).should("be.visible");
    cy.get(
      '[data-testid="local-storage-https://api.bromleysat.space/api/data"]'
    ).realClick();
  });
  it("tests changing data retention value", () => {
    cy.get(
      '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).should("be.visible");
    cy.get(
      '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).should("have.text", "21d");
    cy.get(
      '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).realClick();
    cy.get(
      '[data-testid="data-retention-5s-https://api.bromleysat.space/api/data"]'
    ).realClick();
    cy.get(".MuiContainer-root").realClick();
  });
  it("tests changing refresh rate value", () => {
    cy.get(
      '[data-testid="refresh-rate-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).should("be.visible");
    cy.get(
      '[data-testid="refresh-rate-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).should("have.text", "1s");
    cy.get(
      '[data-testid="refresh-rate-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).realClick();
    cy.get(
      '[data-testid="refresh-rate-15s-https://api.bromleysat.space/api/data"]'
    ).realClick();
    cy.get(".MuiContainer-root").realClick();
  });
  it("tests changing chart time window value", () => {
    cy.get(
      '[data-testid="chart-time-window-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).should("be.visible");
    cy.get(
      '[data-testid="chart-time-window-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).should("have.text", "5m");
    cy.get(
      '[data-testid="chart-time-window-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).realClick();
    cy.get(
      '[data-testid="chart-time-window-21d-https://api.bromleysat.space/api/data"]'
    ).realClick();
    cy.get(".MuiContainer-root").realClick();
  });
  it("tests zooming in and out functionality", () => {
    cy.get(".recharts-wrapper").drag(".recharts-wrapper", {
      source: { x: 100, y: 100 },
      target: { x: 600, y: 20 },
      force: true,
    });
    cy.get(".recharts-wrapper").realClick();
    cy.wait(5000);
    cy.get(
      '[data-testid="zoom-out-https://api.bromleysat.space/api/data"]'
    ).realClick();
    cy.wait(5000);
  });
});
