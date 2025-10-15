import { useEffect } from "react";
import { RouterProvider } from "react-router";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { verifyLogin } from "./store/slices/auth/thunks";
import { router } from "./routes/routes";

export function App() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state: any) => state.auth);
  const accessToken = localStorage.getItem("at__hc-kb");

  useEffect(() => {
    if (!user && accessToken) {
      dispatch(verifyLogin());
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
}
