import axios from "axios";
import { url } from "@/connections/mainApi";
import { setLoading, logout, setUser } from "./authSlice";

export const loginUser = (payload: any) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		// const userLogged = await axios.post(`${url}/auth/login`, payload);
		// dispatch(setUser(userLogged?.data?.user));

		let userLogged;

    console.log(payload);
		if (payload.email === "admin@gmail.com") {
			userLogged = { role: "ADMIN" };
		} else if (payload.email === "cliente@gmail.com") {
			userLogged = { role: "CLIENTE" };
		} else {
			return;
			// userLogged = null;
		}

		dispatch(setUser(userLogged));
		// localStorage.setItem("at__keys-kb", userLogged?.data?.access_token);
	} catch (error) {
		console.error("Login estático falló:", error);
	} finally {
		dispatch(setLoading(false));
	}
};

export const logoutUser = () => (dispatch: any) => {
	dispatch(logout());
};

export const verifyLogin = () => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const accessToken = localStorage.getItem("at__event-jp");
		const userLogged = await axios.get(`${url}/auth/verify`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		dispatch(setUser(userLogged?.data?.user));
		localStorage.setItem("at__event-jp", userLogged?.data?.access_token);
	} catch (error) {
		console.error("Refresh login falló:", error);
		dispatch(logout());
	} finally {
		dispatch(setLoading(false));
	}
};
