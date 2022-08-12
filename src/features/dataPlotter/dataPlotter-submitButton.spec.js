import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import * as React from "react";
import { DataPlotter } from "./dataPlotter";

describe("Submit Button Functionality", () => {
  it("should be visible", () => {
    const { getByTestId } = render(<DataPlotter />);
    const buttonSubmit = getByTestId("text-area-submit");
    expect(buttonSubmit).toBeVisible();
  });
  it("should have the text content of UPDATE", () => {
    const { getByTestId } = render(<DataPlotter />);
    const buttonSubmit = getByTestId("text-area-submit");
    expect(buttonSubmit).toHaveTextContent("Update");
    expect(buttonSubmit).toHaveStyle("background-color: #00C119");
  });
  it("should have green background, font-family Quicksand and font-weight 700", () => {
    const { getByTestId } = render(<DataPlotter />);
    const buttonSubmit = getByTestId("text-area-submit");
    expect(buttonSubmit).toHaveStyle("background-color: #00C119");
    expect(buttonSubmit).toHaveStyle("font-family: Quicksand");
    expect(buttonSubmit).toHaveStyle("font-weight: 700");
  });
});
