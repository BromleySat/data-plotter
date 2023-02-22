import { createSlice } from "@reduxjs/toolkit";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    animation: true,
  },
  reducers: {
    setLeft: (state, action) => {
      state.left = action.payload;
    },
    setRight: (state, action) => {
      state.right = action.payload;
    },
    setRefAreaLeft: (state, action) => {
      state.refAreaLeft = action.payload;
    },
    setRefAreaRight: (state, action) => {
      state.refAreaRight = action.payload;
    },
  },
});

export const { setData } = chartSlice.actions;

export default chartSlice.reducer;
