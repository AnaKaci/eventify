import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("eventifyUser"));
  } catch (error) {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getStoredUser()
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("eventifyUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("eventifyUser");
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
