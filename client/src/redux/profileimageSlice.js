import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Imageupload: false,
};

const profileimageSlice = createSlice({
  name: "profileimg",
  initialState,
  reducers: {
    setimg: (state) => {
      state.loading = true;
    },
  },
});

export const { setimg } = profileimageSlice.actions;

export default profileimageSlice.reducer;
