import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "./darkThemeSlice";
import textFieldReducer from "./textFieldSlice";

const darkModeMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("darkTheme/")) {
    localStorage.setItem(
      "darkTheme",
      JSON.stringify(store.getState().darkTheme)
    );
  }

  return result;
};

export const store = configureStore({
  reducer: { darkTheme: darkThemeReducer, textfield: textFieldReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(darkModeMiddleware),
});
