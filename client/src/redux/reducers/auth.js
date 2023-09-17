import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: "",
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    },
    signout: (state) => {
      state.user = null;
      state.token = "";

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, signout } = authSlice.actions;
export default authSlice.reducer;
