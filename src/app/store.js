import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "../features/darkTheme/darkThemeSlice";

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
  reducer: { darkTheme: darkThemeReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(darkModeMiddleware),
});
