import { createBrowserRouter, Navigate } from "react-router";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import { LoginPage } from "../features/Login/LoginPage";
import { Error404 } from "@/features/Error404/Error404";
import { Dashboard } from "@/features/Dashboard/Dashboard";

import { Eventos } from "@/features/Eventos/Eventos";
import { Evento } from "@/features/Eventos/Evento/Evento";
import { Proveedores } from "@/features/Proveedores/Proveedores";
import { Proveedor } from "@/features/Proveedores/Proveedor/Proveedor";
  
export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" />, errorElement: <Error404 /> },
  {
    path: "/login",
    element: <PublicRoute />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute allowedRoles={["ADMIN", "PROVEEDOR"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [{ index: true, element: <Dashboard /> }],
      },
    ],
  },
  {
    path: "/eventos",
    element: <ProtectedRoute allowedRoles={["ADMIN", "CLIENTE"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [{ index: true, element: <Eventos /> }],
      },
    ],
  },
  {
    path: "/eventos/:id",
    element: <ProtectedRoute allowedRoles={["ADMIN", "CLIENTE"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [{ index: true, element: <Evento /> }],
      },
    ],
  },
  {
    path: "/proveedores",
    element: <ProtectedRoute allowedRoles={["ADMIN", "CLIENTE"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [{ index: true, element: <Proveedores /> }],
      },
    ],
  },
  {
    path: "/proveedores/:id",
    element: <ProtectedRoute allowedRoles={["ADMIN", "CLIENTE"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [{ index: true, element: <Proveedor /> }],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <h1>401 - No autorizado</h1>,
  },
]);
