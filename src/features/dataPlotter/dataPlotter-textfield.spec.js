import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { DataPlotter } from "./dataPlotter";

describe("Textfield Functionality", () => {
  it("tests visibility of the TextField", () => {
    const { getByTestId } = render(<DataPlotter />);
    const textField = getByTestId("text-area");
    expect(textField).toBeVisible();
  });
  it("checks the value of the TextField", () => {
    const { getByTestId } = render(<DataPlotter />);
    const textField = getByTestId("text-area");
    expect(textField.textContent).toBe("api.bromleysat.space/api/data");
  });
  it("should clear the TextField", () => {
    const { getByTestId } = render(<DataPlotter />);
    const textField = getByTestId("text-area");
    const submitButton = getByTestId("text-area-submit");
    fireEvent.change(textField, {
      target: {
        value: "",
      },
    });
    fireEvent.click(submitButton);
    expect(textField).toBeEmpty();
  });
});
