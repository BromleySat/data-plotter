import { createSlice } from "@reduxjs/toolkit";

export const errorsSlice = createSlice({
  name: "errors",
  initialState: {
    errors: [],
  },
  reducers: {
    setErrors: (state, action) => {
      if (state.errors.includes(action.payload)) return;
      state.errors = [...state.errors, action.payload];
    },
    removeError: (state, action) => {
      if (!state.errors.includes(action.payload)) return;
      const index = state.errors.indexOf(action.payload);
      state.errors = [...state.errors].splice(index, 1);
    },
    clearErrors: (state) => {
      state.errors = [];
    },
  },
});

export const { setErrors, removeError, clearErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
