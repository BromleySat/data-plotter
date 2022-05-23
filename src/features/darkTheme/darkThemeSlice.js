import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("darkTheme")) || {
  isDark: true,
};

export const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggle } = darkThemeSlice.actions;

export const selectIsDark = (state) => state.darkTheme.isDark;

export default darkThemeSlice.reducer;
