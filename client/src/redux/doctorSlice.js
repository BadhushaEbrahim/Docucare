import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorToken: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorLogin: (state, action) => {
      state.doctorToken = action.payload.doctorToken;
    },

    setDoctorLogout: (state) => {
      state.doctorToken = null;
    },
  },
});

export const { setDoctorLogin, setDoctorLogout } = doctorSlice.actions;

export default doctorSlice.reducer;
