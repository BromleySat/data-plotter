import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    errors: [],
  },
  reducers: {
    setErrors: (state, action) => {
      state.errors = [...state.errors, action.payload];
    },
    removeError: (state, action) => {
      state.val = [...state.errors].slice(action.payload);
    },
  },
});

export const { setErrors, removeError } = errorSlice.actions;

export default errorSlice.reducer;
