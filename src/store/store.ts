import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { toastSlice } from "./slices/toast";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		toast: toastSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
