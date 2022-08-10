describe("Data Plotter Testing Features", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.wait(20000);
  });
  it("tests switching to light mode", () => {
    cy.get('[data-testid="dark-theme-toggle"]').click();
  });
  it("tests switching to dark mode", () => {
    cy.get('[data-testid="dark-theme-toggle"]').click();
    cy.get('[data-testid="dark-theme-toggle"]').click();
  });
  it("tests displaying tooltip on hover", () => {
    cy.get(
      '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).trigger("mouseover");
  });
  it("tests toggling local storage", () => {
    cy.get(
      '[data-testid="local-storage-https://api.bromleysat.space/api/data"]'
    ).click();
  });
  it("tests changing data retention value", () => {
    cy.get(
      '[data-testid="data-retention-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).click();
    cy.get(
      '[data-testid="data-retention-5s-https://api.bromleysat.space/api/data"]'
    ).click();
    cy.get(".MuiContainer-root").click();
  });
  it("tests changing refresh rate value", () => {
    cy.get(
      '[data-testid="refresh-rate-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).click();
    cy.get(
      '[data-testid="refresh-rate-15s-https://api.bromleysat.space/api/data"]'
    ).click();
    cy.get(".MuiContainer-root").click();
  });
  it("tests changing chart time window value", () => {
    cy.get(
      '[data-testid="chart-time-window-https://api.bromleysat.space/api/data"] > #demo-select-small'
    ).click();
    cy.get(
      '[data-testid="chart-time-window-21d-https://api.bromleysat.space/api/data"]'
    ).click();
    cy.get(".MuiContainer-root").click();
  });
});
