import { createSlice } from "@reduxjs/toolkit";
export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    animation: true,
    data: "",
  },
  reducers: {
    // add your non-async reducers here
    updateRefAreaLeft: (state, action) => {
      state.refAreaLeft = action.payload;
    },
    updateRefAreaRight: (state, action) => {
      state.refAreaRight = action.payload;
    },
    updateData: (state, action) => {
      state.data = action.payload;
    },
    sliceData: (state, action) => {
      state.data = action.payload.slice();
    },
    updateLeft: (state, action) => {
      state.left = action.payload;
    },
    updateRight: (state, action) => {
      state.right = action.payload;
    },
    switchPositions: (state) => {
      [state.refAreaLeft, state.refAreaRight] = [
        state.refAreaRight,
        state.refAreaLeft,
      ];
    },
    zoom: (state) => {
      if (
        state.refAreaLeft === state.refAreaRight ||
        state.refAreaRight === ""
      ) {
        updateRefAreaLeft();
        console.log(state.refAreaLeft);
        updateRefAreaRight();
        console.log(state.refAreaRight);

        return;
      }
      if (state.refAreaLeft > state.refAreaRight) {
        switchPositions();
      }
      sliceData(state.data);
      updateRefAreaLeft();
      updateRefAreaRight();
      updateLeft(state.refAreaLeft);
      updateRight(state.refAreaRight);
    },

    zoomOut: (state) => {
      sliceData(state.data);
      updateRefAreaLeft();
      updateRefAreaRight();
      updateLeft("dataMin");
      updateRight("dataMax");
    },
  },
});

export const {
  zoom,
  zoomOut,
  updateRefAreaLeft,
  updateRefAreaRight,
  updateData,
  sliceData,
  updateLeft,
  updateRight,
  switchPositions,
} = chartSlice.actions;
export default chartSlice.reducer;
