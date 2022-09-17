import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/features/auth/authSlice";
import adminReducer from "../components/features/adminSlice/adminSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: adminReducer,
  },
});
