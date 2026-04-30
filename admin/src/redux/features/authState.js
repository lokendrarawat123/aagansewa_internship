import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  role: "",
  isAuth: false,
};
const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    setUser: (state, action) => {
      // Yadi payload ma email chha bhane matra isAuth true garne
      if (action.payload && action.payload.email) {
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.isAuth = true;
      } else {
        // Natra false nai rakhne
        state.isAuth = false;
      }
    },
    logout: (state) => {
      state.email = "";
      state.role = "";
      state.isAuth = false;
    },
  },
});
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
