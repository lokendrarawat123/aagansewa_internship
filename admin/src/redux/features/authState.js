import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  email: "",
  role: "",
  branch_name: "",
  branch_id: "",
  isAuth: false,
};
const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    setUser: (state, action) => {
      // Yadi payload ma email chha bhane matra isAuth true garne
      if (action.payload && action.payload.email) {
        state.name = action.payload.name || "";
        state.email = action.payload.email;
        state.role = action.payload.role || "";
        state.branch_name = action.payload.branch_name || "";
        state.branch_id = action.payload.branch_id || "";
        state.isAuth = true;
      } else {
        // Natra false nai rakhne
        state.isAuth = false;
      }
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.role = "";
      state.branch_name = "";
      state.branch_id = "";
      state.isAuth = false;
    },
  },
});
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
