import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/store/hooks";

export default function PublicRoute() {
  const { user } = useAppSelector((state) => state.auth);
  if (user?.rol) {
    if (user.rol === "ADMIN") return <Navigate to="/dashboard" />;
    if (user.rol === "CLIENTE") return <Navigate to="/eventos" />;
    if (user.rol === "PROVEEDOR")
      return <Navigate to={`/proveedores/${user?.id}`} />;
  }
  return <Outlet />;
}
