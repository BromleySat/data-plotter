import { createSlice } from "@reduxjs/toolkit";
import { trimHttp } from "../helpers/trimHttp";

export const textFieldSlice = createSlice({
  name: "textfield",
  initialState: {
    urlList: JSON.parse(localStorage.getItem("urlList")) || [
      "https://api.bromleysat.space",
    ],
    textBoxValue:
      trimHttp(JSON.parse(localStorage.getItem("urlList"))).join(",") ||
      ["https://api.bromleysat.space"].join(","),
    error: false,
    validUrls: [],
    devicesId: [],
  },
  reducers: {
    setUrlList: (state, action) => {
      state.urlList = action.payload;
    },
    setTextBoxValue: (state, action) => {
      state.textBoxValue = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setValidUrls: (state, action) => {
      state.validUrls = [...state.validUrls, action.payload];
    },
    resetValidUrls: (state) => {
      state.validUrls = [];
    },
    setDevicesId: (state, action) => {
      state.devicesId = [...state.devicesId, action.payload];
    },
    resetDevicesId: (state) => {
      state.devicesId = [];
    },
  },
});

export const {
  setUrlList,
  setTextBoxValue,
  setError,
  setValidUrls,
  resetValidUrls,
  setDevicesId,
  resetDevicesId,
} = textFieldSlice.actions;

export default textFieldSlice.reducer;
