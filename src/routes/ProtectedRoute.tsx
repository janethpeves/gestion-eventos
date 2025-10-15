//-- Middleware para la protección de rutas por el equipo de Sineryx
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/store/hooks";
// import { currentUser } from "@/utils/currentUser";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAppSelector((state) => state.auth);
  // const user = currentUser;
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
}
