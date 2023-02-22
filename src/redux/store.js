import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "./darkTheme/darkThemeSlice";
import textBoxReducer from "./textBox/textBoxSlice";
import dataLocalStorageToggleReducer from "./dataLocalStorageToggle/dataLocalStorageToggleSlice";
import dataReducer from "./dataSlice";
import chartReducer from "./chart/chartSlice";

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
    dataLocalStorageToggle: dataLocalStorageToggleReducer,
    data: dataReducer,
    chart: chartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(darkModeMiddleware),
});
