import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { loaderSlice } from "./loaderSlice";
import { userSlice } from "./userSlice";
import { getUserSlice } from "./getUserSlice";
const rootReducer = combineReducers({
  loader: loaderSlice.reducer,
  user: userSlice.reducer,
  currentUser: getUserSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
