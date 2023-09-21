import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },

    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = spinnerSlice.actions;

export default spinnerSlice.reducer;
