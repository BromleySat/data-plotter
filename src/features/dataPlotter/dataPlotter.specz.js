// //import { storageSetItem } from "./dataPlotter";
// import { DataPlotter } from "./dataPlotter";

// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { act } from "react-dom/test-utils";

// let mockStorage = {};
// let setItemSpy, getItemSpy; //, submit;

// describe("...", () => {
//   beforeEach(() => {
//     setItemSpy = jest
//       .spyOn(Storage.prototype, "setItem")
//       .mockImplementation((key, value) => {
//         mockStorage[key] = value;
//       });

//     getItemSpy = jest
//       .spyOn(Storage.prototype, "getItem")
//       .mockImplementation((key) => mockStorage[key]);

//     //submit = jest.fn().mockImplementation((e) => e.preventDefault());
//   });

//   afterEach(() => {
//     // then, detach our spies to avoid breaking other test suites
//     getItemSpy.mockRestore();
//     setItemSpy.mockRestore();
//     mockStorage = {};
//   });

//   it("a", () => {
//     act(() => {
//       render(<DataPlotter />);
//       //getByTestId
//       userEvent.type(
//         screen.getByRole("textbox"),
//         "localhost:3080/random-data, localhost:3090/random-data"
//       );

//       userEvent.click(
//         screen.getByRole("button", {
//           name: /update/i,
//         })
//       );
//     });

//     expect(mockStorage["urlList"]).toEqual(
//       JSON.stringify([
//         "localhost:3080/random-data",
//         "localhost:3090/random-data",
//       ])
//     );
//     //TODO validate that there is No error message
//     expect(screen.getByText(/please provide valid api/i)).toBeNull();
//   });

//   it("b", () => {
//     act(() => {
//       render(<DataPlotter />);
//       //getByTestId
//       userEvent.type(screen.getByRole("textbox"), ":P");

//       userEvent.click(
//         screen.getByRole("button", {
//           name: /update/i,
//         })
//       );
//     });

//     expect(mockStorage["urlList"]).toBeUndefined();
//     //Todo validate that validation error massage is visible
//     expect(screen.getByText(/please provide valid api/i)).toBeTruthy();
//   });
// });
