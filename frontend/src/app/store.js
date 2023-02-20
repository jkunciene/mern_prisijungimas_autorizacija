import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import goalReducer from "../features/goalSlice";
import usersReducer from "../features/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    users: usersReducer,
  },
});
