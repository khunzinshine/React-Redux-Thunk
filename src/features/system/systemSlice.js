import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  smallMenu: false,
  menuList: [
    { name: "DashBoard", to: "/admin/dashboard", icon: "home" },
    { name: "Author", to: "/admin/list", icon: "user" },
    { name: "Page", to: "/admin/list-Page", icon: "home" },
  ],
  tabs: [
    {
      name: "DashBoard",
      path: "/admin/dashboard",
      pathname: "/admin/dashboard",
    },
  ],
};

const systemSlice = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    toggleMenu: (state = initialState.smallMenu, action) => {
      return { ...state, ...action.payload };
    },
    loadingAction: (state = initialState, { payload }) => {
      return { ...state, loading: payload };
    },
  },
  extraReducers: {},
});

export const system = (state) => state.system;
export const { toggleMenu, loadingAction } = systemSlice.actions;
export default systemSlice.reducer;
