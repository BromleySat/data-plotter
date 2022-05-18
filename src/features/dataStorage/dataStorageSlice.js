import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("checked")) || {
  toggled: false,
};

export const dataStorageSlice = createSlice({
  name: "dataStorage",
  initialState,
  reducers: {
    toggle: (state) => {
      state.toggled = !state.toggled;
    },
  },
});

export const { toggle } = dataStorageSlice.actions;

export const toggleDataStorage = (state) => state.dataStorage.toggle;

export default dataStorageSlice.reducer;
