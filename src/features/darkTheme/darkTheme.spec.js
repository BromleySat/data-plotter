import "@testing-library/jest-dom/extend-expect";
import { store } from "../../app/store";
import { toggle } from "./darkThemeSlice";

describe("Dark Theme Toggle Functionality", () => {
  let state = store.getState().darkTheme;
  it("should have a true value", () => {
    expect(state.isDark).toBe(true);
  });
  it("should have a false value", () => {
    store.dispatch(toggle());
    state = store.getState().darkTheme;
    expect(state.isDark).toBe(false);
  });
});
