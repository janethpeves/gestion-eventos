import { createSlice } from "@reduxjs/toolkit";

interface User {
  email: string;
  firstLastname: string;
  id: string;
  name: string;
  role: string;
  secondLastname: string;
}

export interface AuthState {
  isLoading: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoading: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isLoading = false;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
