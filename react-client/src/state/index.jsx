import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  data: null,
  id: null,
  user: null,
  picture: null,
  token: null,
  role: null,
  allUser: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setRegister: (state, action) => {
      state.data = action.payload;
    },
    setLogin: (state, action) => {
      state.id = action.payload.id;
      state.user = action.payload.user;
      state.picture = action.payload.picture;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.user = action.payload.user;
      state.picture = action.payload.picture;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.id = null;
      state.user = null;
      state.token = null;
      state.role = null;
    },
    setAllUser: (state, action) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.allUser = action.payload.allUser;
    },
  },
});

export const { setMode, setRegister, setLogin, setUser, setToken, setLogout, setAllUser } = globalSlice.actions;
export default globalSlice.reducer;
