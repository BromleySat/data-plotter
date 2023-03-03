import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render as customRender } from "@testing-library/react";
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
    const { getByTestId, queryByTestId } = render(<TextBox />);
    const textfield = getByTestId("text-area");
    const submitButton = getByTestId("text-area-submit");

    fireEvent.change(textfield, {
      target: {
        value: "localhost:3080,localhost:3090",
      },
    });
    fireEvent.click(submitButton);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "urlList",
      `["http://localhost:3080","http://localhost:3090"]`
    );

    const submitError = queryByTestId("error");
    expect(submitError).toBeNull();
  });

  it("should not set the local storage and display an error", () => {
    const { getByTestId } = render(<TextBox />);
    const textfield = getByTestId("text-area");
    const submitButton = getByTestId("text-area-submit");

    fireEvent.change(textfield, {
      target: {
        value: ":P",
      },
    });

    fireEvent.click(submitButton);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
    const submitError = getByTestId("error");
    expect(submitError).toBeTruthy();
  });
});
