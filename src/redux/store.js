import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "./darkTheme/darkThemeSlice";
import textBoxReducer from "./textBox/textBoxSlice";

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
  reducer: {
    darkTheme: darkThemeReducer,
    textBox: textBoxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(darkModeMiddleware),
});
