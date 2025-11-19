import { RouterProvider } from "react-router";

import { useAppSelector } from "./store/hooks";
import { router } from "./routes/routes";

export function App() {
  const { isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
}
