import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import DataRetention from "./dataRetention";

describe("Data Retention Functionality", () => {
  it("should be visible", () => {
    const { getByTestId } = render(
      <DataRetention validUrl="https://api.bromleysat.space/api/data" />
    );
    const dataRetention = getByTestId(
      "data-retention-https://api.bromleysat.space/api/data"
    );
    expect(dataRetention).toBeVisible();
  });
  it("should have the text content value of 21d", () => {
    const { getByTestId } = render(
      <DataRetention validUrl="https://api.bromleysat.space/api/data" />
    );
    const dataRetention = getByTestId(
      "data-retention-https://api.bromleysat.space/api/data"
    );
    expect(dataRetention).toHaveTextContent("21d");
  });
  it("should click on the Data Retention icon and check if dropdown menu is visible", () => {
    const { getByTestId } = render(
      <DataRetention validUrl="https://api.bromleysat.space/api/data" />
    );
    const dataRetention = getByTestId(
      "data-retention-https://api.bromleysat.space/api/data"
    );
    fireEvent.click(dataRetention);
    screen.debug();
    expect(
      getByTestId("data-retention-10s-https://api.bromleysat.space/api/data")
    ).toBeInTheDocument();
  });
});
