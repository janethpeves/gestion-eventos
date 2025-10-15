import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/store/hooks";

export default function PublicRoute() {
  const { user } = useAppSelector((state:any) => state.auth);
  if (user?.role === "ADMIN") return <Navigate to="/dashboard" />;
  if (user?.role === "CLIENTE") return <Navigate to="/eventos" />;
  return <Outlet />;
}
