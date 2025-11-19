import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/store/hooks";

type Role = "ADMIN" | "CLIENTE" | "PROVEEDOR";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol as Role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
