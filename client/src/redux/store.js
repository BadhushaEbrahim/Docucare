import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import doctorSlice from "./doctorSlice";
import adminSlice from "./adminSlice";
import spinnerSlice from "./spinnerSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    doctor: doctorSlice,
    admin: adminSlice,
    spinner: spinnerSlice,
  },
});

export default store;
