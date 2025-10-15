import { FiCalendar, FiUsers, FiTrendingUp } from "react-icons/fi";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { HiUsers, HiCalendar } from "react-icons/hi2";
import { MdEventAvailable, MdEventBusy} from "react-icons/md";
import {  TbCalendarEvent } from "react-icons/tb";

import { BiCalendarCheck } from "react-icons/bi";

import { KpiBox } from "./components/KpiBox/KpiBox";
import { BarChart } from "./components/BarChart/BarChart";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { useAppSelector } from "@/store/hooks";

// Configuración de KPIs por rol para sistema de gestión de eventos
const KPI_CONFIG: any = {
  ADMIN: [
    {
      title: "Total de Eventos",
      value: "156",
      icon: <FiCalendar />,
      bgColor: "#fff",
      textColor: "#797a7b",
    },
    {
      title: "Eventos Activos",
      value: "23",
      icon: <MdEventAvailable />,
      bgColor: "var(--primary-color-light)",
      textColor: "#fff",
    },
    {
      title: "Participantes Registrados",
      value: "1,247",
      icon: <HiUsers />,
      bgColor: "#919293",
      textColor: "#fff",
    },
    {
      title: "Eventos Completados",
      value: "133",
      icon: <BiCalendarCheck />,
      bgColor: "#606162",
      textColor: "#fff",
    },
    {
      title: "Eventos Cancelados",
      value: "8",
      icon: <MdEventBusy />,
      bgColor: "#dc3545",
      textColor: "#fff",
    },
    {
      title: "Tasa de Asistencia",
      value: "87%",
      icon: <FiTrendingUp />,
      bgColor: "#28a745",
      textColor: "#fff",
    },
  ],
  PROVEEDOR: [
    {
      title: "Mis Eventos",
      value: "12",
      icon: <FiCalendar />,
      bgColor: "#fff",
      textColor: "#797a7b",
    },
    {
      title: "Tiempo prom. de duración",
      value: "2.5 hrs",
      icon: <IoTimeOutline />,
      bgColor: "#fff",
      textColor: "#797a7b",
    },
    {
      title: "Participantes Asignados",
      value: "89",
      icon: <HiUsers />,
      bgColor: "var(--primary-color-light)",
      textColor: "#fff",
    },
    {
      title: "Eventos Pendientes",
      value: "5",
      icon: <MdEventBusy />,
      bgColor: "#919293",
      textColor: "#fff",
    },
    {
      title: "Eventos Esta Semana",
      value: "3",
      icon: <TbCalendarEvent />,
      bgColor: "#ffc107",
      textColor: "#000",
    },
    {
      title: "Calificación Promedio",
      value: "4.8/5",
      icon: <FiTrendingUp />,
      bgColor: "#17a2b8",
      textColor: "#fff",
    },
  ],
  CLIENTE: [
    {
      title: "Eventos Inscritos",
      value: "8",
      icon: <FiCalendar />,
      bgColor: "#fff",
      textColor: "#797a7b",
    },
    {
      title: "Próximos Eventos",
      value: "3",
      icon: <TbCalendarEvent />,
      bgColor: "var(--primary-color-light)",
      textColor: "#fff",
    },
    {
      title: "Eventos Completados",
      value: "5",
      icon: <BiCalendarCheck />,
      bgColor: "#28a745",
      textColor: "#fff",
    },
    {
      title: "Horas de Formación",
      value: "24.5",
      icon: <IoTimeOutline />,
      bgColor: "#17a2b8",
      textColor: "#fff",
    },
  ]
};

export const Dashboard = () => {
  const { user } = useAppSelector((state: any) => state.auth);

  // Datos para el gráfico de eventos
  const eventChartData = [
    {
      type: "bar" as const,
      label: "Eventos Realizados",
      backgroundColor: "#9E061F",
      data: [12, 15, 8, 20, 18, 25, 22, 16, 19, 14, 17, 21],
    },
    {
      type: "bar" as const,
      label: "Eventos Cancelados",
      backgroundColor: "#FAE0E4",
      data: [2, 1, 3, 1, 2, 1, 0, 2, 1, 3, 1, 1],
    },
  ];

  const eventLabels = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Datos para el gráfico de participación
  const participationChartData = [
    {
      type: "line" as const,
      label: "Participantes",
      backgroundColor: "rgba(40, 167, 69, 0.1)",
      borderColor: "#9E061F",
      data: [45, 52, 38, 67, 58, 72, 65, 48, 55, 42, 61, 68],
    },
  ];
  
  // Función para obtener KPIs basado en el rol
  const getKpiData = (): any[] => {
    switch (user?.role) {
      case "ADMIN":
        return KPI_CONFIG.ADMIN;
      case "PROVEEDOR":
        return KPI_CONFIG.PROVEEDOR;
      case "CLIENTE":
        return KPI_CONFIG.CLIENTE;
      default:
        return [];
    }
  };

  const kpiData = getKpiData();

  // Si no hay datos para el rol, mostrar mensaje
  if (kpiData.length === 0) {
    return (
      <>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No hay datos disponibles para tu rol</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* KPIs Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 m-5">
        {kpiData.map((kpi: any, index: any) => (
          <KpiBox
            key={`${kpi.title}-${index}`}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            bgColor={kpi.bgColor}
            textColor={kpi.textColor}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 m-5">
        {/* Eventos por Mes */}
        <ContentBox>
          <BarChart title="Eventos por Mes" datasets={eventChartData} labels={eventLabels} />
        </ContentBox>

        {/* Participación en Eventos */}
        <ContentBox>
          <BarChart 
            title="Participación en Eventos"
            description="Tendencia de participantes en los últimos 12 meses"
            datasets={participationChartData}
            labels={eventLabels}
            height={400}
            stacked={false}
          />
        </ContentBox>
      </div>

      {/* Eventos Recientes Section */}
      <div className="m-5">
        <ContentBox>
          <div className="card">
            <h3 className="mb-4">Eventos Recientes</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-blue-500" />
                  <div>
                    <p className="font-medium">Conferencia de Tecnología 2024</p>
                    <p className="text-sm text-gray-500">15 de Diciembre, 2024</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Completado
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-orange-500" />
                  <div>
                    <p className="font-medium">Workshop de React</p>
                    <p className="text-sm text-gray-500">20 de Diciembre, 2024</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                  En Progreso
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-blue-500" />
                  <div>
                    <p className="font-medium">Seminario de IA</p>
                    <p className="text-sm text-gray-500">25 de Diciembre, 2024</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Programado
                </span>
              </div>
            </div>
          </div>
        </ContentBox>
      </div>

      {/* Estadísticas Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 m-5">
        <ContentBox>
          <div className="text-center">
            <HiCalendar className="text-4xl text-blue-500 mx-auto mb-2" />
            <h4 className="text-lg font-semibold">Eventos Esta Semana</h4>
            <p className="text-3xl font-bold text-blue-600">7</p>
            <p className="text-sm text-gray-500">+2 vs semana anterior</p>
          </div>
        </ContentBox>

        <ContentBox>
          <div className="text-center">
            <FiUsers className="text-4xl text-green-500 mx-auto mb-2" />
            <h4 className="text-lg font-semibold">Participantes Activos</h4>
            <p className="text-3xl font-bold text-green-600">342</p>
            <p className="text-sm text-gray-500">+15% este mes</p>
          </div>
        </ContentBox>

        <ContentBox>
          <div className="text-center">
            <IoLocationOutline className="text-4xl text-purple-500 mx-auto mb-2" />
            <h4 className="text-lg font-semibold">Ubicaciones Activas</h4>
            <p className="text-3xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-500">En 5 ciudades</p>
          </div>
        </ContentBox>
      </div>
    </>
  );
};