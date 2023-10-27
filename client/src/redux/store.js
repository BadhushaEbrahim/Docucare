import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import doctorSlice from "./doctorSlice";
import adminSlice from "./adminSlice";
import spinnerSlice from "./spinnerSlice";
import profileimageSlice from "./profileimageSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    doctor: doctorSlice,
    admin: adminSlice,
    spinner: spinnerSlice,
    profileimgupdate:profileimageSlice
  },
});

export default store;
