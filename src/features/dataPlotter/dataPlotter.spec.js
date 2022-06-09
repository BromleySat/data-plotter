import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
//import { storageSetItem } from "./dataPlotter";
import { DataPlotter } from "./dataPlotter";

describe("...", () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn());

  it("should set local storage", () => {
    const { getByTestId, queryByTestId } = render(<DataPlotter />);
    const textfield = getByTestId("text-area");
    const submitButton = getByTestId("text-area-submit");

    fireEvent.change(textfield, {
      target: {
        value: "localhost:3080/api/random-data,localhost:3090/api/random-data",
      },
    });

    fireEvent.click(submitButton);

    //TODO validate that there is No error message
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "urlList",
      `["http://localhost:3080/api/random-data","http://localhost:3090/api/random-data"]`
    );

    const submitError = queryByTestId("error");
    expect(submitError).toBeNull();
  });

  it("should not set local storage and display an error", () => {
    const { getByTestId } = render(<DataPlotter />);
    const textfield = getByTestId("text-area");
    const submitButton = getByTestId("text-area-submit");

    fireEvent.change(textfield, {
      target: {
        value: ":P",
      },
    });

    fireEvent.click(submitButton);

    //Todo validate that validation error massage is visible
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
    const submitError = getByTestId("error");
    expect(submitError).toBeTruthy();
  });
});
