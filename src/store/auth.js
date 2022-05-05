import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserIsLogin: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    setUserUnLog: (state) => {
      state.user = {};
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserIsLogin, setUserUnLog } = authSlice.actions;

export default authSlice.reducer;
