/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { useGetFetch } from "@/hooks/useGetFetch";

// interface EventoDetalle {
// 	id: number;
// 	titulo: string;
// 	descripcion: string;
// 	fecha: string;
// 	hora: string;
// 	ubicacion: string;
// 	coordenadas?: {
// 		lat: number;
// 		lng: number;
// 	};
// 	estado: "confirmado" | "pendiente" | "cancelado";
// 	proveedores: Proveedor[];
// }

// interface Proveedor {
// 	id: number;
// 	nombre: string;
// 	tipo: string;
// 	icono?: string;
// 	color?: string;
// }

// Datos de ejemplo (reemplazar con datos reales de API)
// const eventoEjemplo: EventoDetalle = {
// 	id: 1,
// 	titulo: "Tech Conference 2024",
// 	descripcion:
// 		"Una conferencia técnica que cubre las últimas tendencias en desarrollo de software, IA y ciberseguridad.",
// 	fecha: "Julio 20, 2024",
// 	hora: "9:00 AM - 5:00 PM",
// 	ubicacion: "Tech Center, 123 Innovation Drive, Techville",
// 	coordenadas: {
// 		lat: 43.8561,
// 		lng: -79.337,
// 	},
// 	estado: "confirmado",
// 	proveedores: [
// 		{
// 			id: 1,
// 			nombre: "Gourmet Catering Co.",
// 			tipo: "Catering",
// 			icono: "🍽️",
// 			color: "bg-orange-100",
// 		},
// 		{
// 			id: 2,
// 			nombre: "Sound & Vision Solutions",
// 			tipo: "AV Equipment",
// 			icono: "AV",
// 			color: "bg-green-800",
// 		},
// 		{
// 			id: 3,
// 			nombre: "Tech Center",
// 			tipo: "Venue",
// 			icono: "🏢",
// 			color: "bg-blue-100",
// 		},
// 	],
// };

export const Evento = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getDataEventDetail = useGetFetch(`/eventos/${id}`);
  console.log(getDataEventDetail.data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const evento: any = getDataEventDetail.data;

  // Función para formatear la fecha desde ISO
  const formatearFecha = (fechaISO: string) => {
    if (!fechaISO) return "";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-PE", {
      weekday: "long", // Día de la semana
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Función para formatear solo la hora desde ISO
  const formatearHora = (horaISO: string) => {
    if (!horaISO) return "";
    const hora = new Date(horaISO);
    return hora.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case "confirmado":
        return "Confirmed";
      case "pendiente":
        return "Pending";
      case "cancelado":
        return "Cancelled";
      default:
        return estado;
    }
  };

  // const handleEdit = () => {
  // 	console.log("Editar evento:", id);
  // 	// Navegar a la página de edición o abrir modal
  // };

  // const handleCancel = () => {
  // 	console.log("Cancelar evento:", id);
  // 	// Lógica para cancelar el evento
  // };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <ContentBox>
        <div className="mb-2">
          <h1 className="text-3xl font-bold dark:text-white mb-2">
            {evento?.titulo}
          </h1>
          <p className="text-[var(--primary-color-light)] dark:text-blue-400 text-sm">
            {evento?.descripcion}
          </p>
        </div>
      </ContentBox>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Event Details */}
        <div className="lg:col-span-2">
          <ContentBox>
            <h2 className="text-xl font-bold dark:text-white mb-4">
              Detalles del Evento
            </h2>

            {/* Date */}
            <div className="mb-4">
              <label className="text-gray-500 dark:text-gray-400 text-sm">
                Fecha
              </label>
              <p className="text-gray-900 dark:text-white font-medium">
                {formatearFecha(evento?.fecha)}
              </p>
            </div>

            {/* Time */}
            <div className="mb-4">
              <label className="text-gray-500 dark:text-gray-400 text-sm">
                Hora
              </label>
              <p className="text-gray-900 dark:text-white font-medium">
                {formatearHora(evento?.hora)}
              </p>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="text-[var(--primary-color-light)] dark:text-blue-400 text-sm">
                Ubicación
              </label>
              <p className="text-gray-900 dark:text-white font-medium">
                {evento?.ubicacion}
              </p>
            </div>

            {/* Map */}
            {/* <div className="mb-6 h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
							{evento.coordenadas ? (
								<iframe
									title="Ubicación del Evento"
									width="100%"
									height="100%"
									frameBorder="0"
									style={{ border: 0 }}
									src={`https://www.openstreetmap.org/export/embed.html?bbox=${
										evento.coordenadas.lng - 0.05
									},${evento.coordenadas.lat - 0.05},${evento.coordenadas.lng + 0.05},${
										evento.coordenadas.lat + 0.05
									}&layer=mapnik&marker=${evento.coordenadas.lat},${evento.coordenadas.lng}`}
									allowFullScreen
								/>
							) : (
								<div className="flex items-center justify-center h-full">
									<p className="text-gray-500 dark:text-gray-400">Mapa no disponible</p>
								</div>
							)}
						</div> */}

            {/* Status */}
            <div className="mb-4">
              <label className="text-gray-500 dark:text-gray-400 text-sm block mb-1">
                Estado
              </label>
              <span className="inline-block px-3 py-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded text-sm font-medium">
                {getEstadoTexto(evento?.status || "")}
              </span>
            </div>

            {/* Providers */}
            <div>
              <label className="text-gray-500 dark:text-gray-400 text-sm block mb-3">
                Proveedores
              </label>
              <div className="space-y-3">
                {getDataEventDetail?.data?.companies?.map((company: any) => (
                  <div
                    key={company.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div
                      className={`w-10 h-10 ${company.color} ${
                        company.color?.includes("800")
                          ? "text-white"
                          : "text-gray-700"
                      } rounded flex items-center justify-center font-bold text-sm`}
                    >
                      {company.icono}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white font-medium text-sm">
                        {company.nombre}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {company.tipo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ContentBox>
        </div>

        {/* Right Column - Action Buttons */}
        <div className="lg:col-span-1">
          <div className="space-y-3 sticky top-6">
            <CustomButton
              text="Agregar Proveedores"
              onClick={() => navigate("/proveedores", { state: { id } })}
              backgroundButton="var(--primary-color-light)"
              colorP="#ffffff"
              additionalClassName="w-full justify-center"
            />
            {/* <CustomButton
							text="Editar Evento"
							onClick={handleEdit}
							backgroundButton="#3B82F6"
							colorP="#ffffff"
							additionalClassName="w-full justify-center"
						/> */}
            {/* <CustomButton
							text="Cancelar Evento"
							onClick={handleCancel}
							backgroundButton="transparent"
							colorP="#64748b"
							additionalClassName="w-full justify-center border border-gray-300 dark:border-gray-600"
						/> */}
          </div>
        </div>
      </div>
    </div>
  );
};
