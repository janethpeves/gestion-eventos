// import { AiFillHome } from "react-icons/ai";
import { FaHome, FaUser } from "react-icons/fa";
import { HiComputerDesktop, HiOutlineCog8Tooth } from "react-icons/hi2";
// import { MdOutlineAddHomeWork } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

export interface RouteConfig {
  label: string;
  url?: string;
  icon?: React.ReactNode;
  roles: string[];
  children?: RouteConfig[];
}

export const appRoutes: RouteConfig[] = [
  {
    label: "Dashboard",
    // path: "/dashboard",
    url: "/dashboard",
    icon: <FaHome />,
    roles: ["ADMIN", "OPERADOR"],
  },
  {
    label: "Gestión de Equipos",
    // path: "/gestion-equipos",
    icon: <HiComputerDesktop />,
    roles: ["ADMIN", "OPERADOR"],
    children: [
      // {
      //   label: "Consumibles",
      //   url: "/equipos",
      //   // icon: <FaHistory />,
      //   roles: ["ADMIN", "OPERADOR"],
      // },
      {
        label: "Salas",
        url: "/salas",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Modelo",
        url: "/modelos",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Tipo de Equipo Radiológico",
        url: "/tipos-equipos-radiologicos",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Fabricante",
        url: "/fabricantes",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Modalidades",
        url: "/modalidades",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
    ], 
  },
  {
    label: "Gestión de Estudios",
    // path: "/gestion-estudios",
    icon: <TbReportSearch size={15} />,
    roles: ["ADMIN", "OPERADOR"],
    children: [
      {
        label: "Lista de Trabajo",
        url: "/estudios",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Plantilla",
        url: "/estudios",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Informes",
        url: "/estudios",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Pacientes",
        url: "/estudios",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Citas",
        url: "/estudios",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Ordenes",
        url: "/estudios",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Sub-Tipo",
        url: "/estudios",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Examenes",
        url: "/estudios",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Macros",
        url: "/estudios",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
    ],
  },
  {
    label: "Personal Asistencial",
    // path: "/gestion-usuarios",
    icon: <FaUser />,
    roles: ["ADMIN", "OPERADOR"],
    children: [
      {
        label: "Especialista",
        url: "/personal",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Especialidad",
        url: "/personal",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Grado",
        url: "/personal",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Médico",
        url: "/personal",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Certificado",
        url: "/personal",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
    ],
  },
  {
    label: "Configuraciones Generales",
    // path: "/gestion-usuarios",
    icon: <HiOutlineCog8Tooth />,
    roles: ["ADMIN", "OPERADOR"],
    children: [
      {
        label: "Visor y PACS",
        url: "/personal",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Tipo de Personal",
        url: "/personal",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
      {
        label: "Configuración de Citas",
        url: "/personal",
        // icon: <FaHistory />,
        roles: ["ADMIN", "OPERADOR"],
      },
    ],
  },
];
