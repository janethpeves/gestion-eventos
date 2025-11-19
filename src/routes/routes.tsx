import { createBrowserRouter, Navigate } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import PublicRoute from "./PublicRoute";
import { LoginPage } from "../features/Login/LoginPage";
import { Dashboard } from "@/features/Dashboard/Dashboard";
import { Eventos } from "@/features/Eventos/Eventos";
import { Evento } from "@/features/Eventos/Evento/Evento";
import { Proveedores } from "@/features/Proveedores/Proveedores";
import { Proveedor } from "@/features/Proveedores/Proveedor/Proveedor";
import ProtectedRoute from "./ProtectedRoute";
import { Clientes } from "@/features/Cliente/Clientes";
//import { Error404 } from "@/features/Error404/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <PublicRoute />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <ProtectedRoute allowedRoles={["ADMIN", "PROVEEDOR"]} />,
            children: [{ index: true, element: <Dashboard /> }],
          },
          {
            path: "/users",
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [{ index: true, element: <Clientes /> }],
          },
          {
            path: "/eventos",
            element: <ProtectedRoute allowedRoles={["ADMIN", "CLIENTE"]} />,
            children: [
              { index: true, element: <Eventos /> },
              { path: ":id", element: <Evento /> },
            ],
          },

          {
            path: "/proveedores",
            element: <ProtectedRoute allowedRoles={["ADMIN", "CLIENTE"]} />,
            children: [{ index: true, element: <Proveedores /> }],
          },

          {
            path: "/proveedores/:id",
            element: (
              <ProtectedRoute
                allowedRoles={["ADMIN", "CLIENTE", "PROVEEDOR"]}
              />
            ),
            children: [{ index: true, element: <Proveedor /> }],
          },
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <h1>401 - No autorizado</h1>,
  },
]);
