import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null || JSON.parse(localStorage.getItem("user")),
    pending: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.pending = true;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export default userSlice.reducer;
export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
