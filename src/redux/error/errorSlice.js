import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    errors: [],
  },
  reducers: {
    setErrors: (state, action) => {
      if (state.errors.includes(action.payload)) return;
      state.errors = [...state.errors, action.payload];
    },
    removeError: (state, action) => {
      state.val = [...state.errors].splice(action.payload, 1);
    },
  },
});

export const { setErrors, removeError } = errorSlice.actions;

export default errorSlice.reducer;
