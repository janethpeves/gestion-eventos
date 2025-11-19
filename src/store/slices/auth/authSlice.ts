import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  nombre: string;
  password: string;
  rol: "CLIENTE" | "PROVEEDOR" | "ADMIN";
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    clearSession: () => initialState,
  },
});

export const { setLoading, setUser, clearSession } = authSlice.actions;

export default authSlice.reducer;
