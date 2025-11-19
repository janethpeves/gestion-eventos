/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { url } from "@/connections/mainApi";
import { clearSession, setLoading, setUser } from "./authSlice";

export const loginUser =
  (payload: { email: string; password: string }) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const userLogged = await axios.post(`${url}/auth/login`, payload);
      dispatch(setUser(userLogged?.data?.user));
      localStorage.setItem("at__event-jp", userLogged?.data?.access_token);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Login estático falló:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logoutUser = () => (dispatch: any) => {
  dispatch(clearSession());
  localStorage.removeItem("at__event-jp");
};
