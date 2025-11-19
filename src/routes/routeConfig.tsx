// import { AiFillHome } from "react-icons/ai";
import { FaHome, FaUser } from "react-icons/fa";
// import { HiOutlineCog8Tooth } from "react-icons/hi2";
// import { MdOutlineAddHomeWork } from "react-icons/md";

export interface RouteConfig {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  roles: string[];
  // children?: RouteConfig[];
}

export const appRoutes: RouteConfig[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
    roles: ["ADMIN"],
  },
  {
    label: "Eventos",
    path: "/eventos",
    // icon: <FaCalendar />,
    roles: ["CLIENTE", "ADMIN"],
  },
  {
    label: "Usuarios",
    path: "/users",
    icon: <FaUser />,
    roles: ["ADMIN"],
  },
  // {
  //   label: "Proveedor",
  //   path: `/proveedores/:id`,
  //   roles: ["PROVEEDOR"],
  // }
  // {
  //   label: "Configuraciones Generales",
  //   icon: <HiOutlineCog8Tooth />,
  //   roles: ["ADMIN"],
  //   path: "/configuraciones-generales",
  //   // children: [
  //   //   {
  //   //     label: "Usuarios",
  //   //     path: "/usuarios",
  //   //     // icon: <FaHistory />,
  //   //     roles: ["ADMIN", "OPERADOR"],
  //   //   },
  //   //   {
  //   //     label: "Roles",
  //   //     path: "/roles",
  //   //     // icon: <FaHistory />,
  //   //     roles: ["ADMIN", "OPERADOR"],
  //   //   },
  //   //   {
  //   //     label: "Proveedores",
  //   //     path: "/proveedores",
  //   //     // icon: <FaHistory />,
  //   //     roles: ["ADMIN", "OPERADOR"],
  //   //   },
  //   //   {
  //   //     label: "Eventos",
  //   //     path: "/eventos",
  //   //     // icon: <FaHistory />,
  //   //     roles: ["ADMIN", "OPERADOR"],
  //   //   },
  //   // ],
  // },
];
