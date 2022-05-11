import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Testing Displaying Of The Chart", () => {
  test("renderLines", () => {
    render(<App />);
    const childElement = screen.getByTestId("chart-line");
    const data = [
      {
        deviceId: "6221d401f8224dc29e85a7693c68a277",
        date: "2022-05-11T15:16:52.9852977Z",
        temperatureC: 16,
        temperatureF: 60,
      },
    ];
    const colors = ["red", "blue", "green", "yellow", "orange"];
    expect(childElement.length).toEqual(1);
  });
});
