import { createSlice } from "@reduxjs/toolkit";

export const dataLocalStorageToggleSlice = createSlice({
  name: "dataLocalStorageToggle",
  initialState: {
    dataLocalStorageToggle: false,
  },
  reducers: {
    setDataLocalStorageToggle: (state, action) => {
      state.dataLocalStorageToggle = action.payload;
    },
  },
});

export const { setDataLocalStorageToggle } =
  dataLocalStorageToggleSlice.actions;

export default dataLocalStorageToggleSlice.reducer;
