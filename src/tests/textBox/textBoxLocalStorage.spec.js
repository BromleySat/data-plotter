import "@testing-library/jest-dom/extend-expect";
import {
  screen,
  fireEvent,
  render as customRender,
} from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { TextBox } from "../../components/TextBox/TextBox";

describe("Testing of setting the local storage", () => {
  const render = (component) =>
    customRender(<Provider store={store}>{component}</Provider>);

  jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn());

  it("should set the local storage", () => {
    render(<TextBox />);
    const textfield = screen.getByTestId("text-area");
    const submitButton = screen.getByTestId("text-area-submit");

    fireEvent.change(textfield, {
      target: {
        value: "api.bromleysat.space",
      },
    });
    fireEvent.click(submitButton);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "urlList",
      `["https://api.bromleysat.space"]`
    );
  });

  it("should not set the local storage and display an error", () => {
    render(<TextBox />);
    const textfield = screen.getByTestId("text-area");
    const submitButton = screen.getByTestId("text-area-submit");
    fireEvent.change(textfield, {
      target: {
        value: ":P",
      },
    });

    fireEvent.click(submitButton);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
    const submitError = screen.getByTestId("error");
    expect(submitError).toBeTruthy();
  });
});
