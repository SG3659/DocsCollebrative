import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
};

export const getUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setUser } = getUserSlice.actions;
