import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "../features/darkTheme/darkThemeSlice";
import dataStorageReducer from "../features/dataStorage/dataStorageSlice";

const darkModeMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("darkTheme/")) {
    localStorage.setItem(
      "darkTheme",
      JSON.stringify(store.getState().darkTheme)
    );
  }

  if (action.type?.startsWith("dataStorage/")) {
    localStorage.setItem(
      "checked",
      JSON.stringify(store.getState().dataStorage)
    );
  }

  return result;
};

export const store = configureStore({
  reducer: { darkTheme: darkThemeReducer, dataStorage: dataStorageReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(darkModeMiddleware),
});
