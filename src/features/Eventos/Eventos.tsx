/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentBox } from "../../components/ContentBox/ContentBox";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PrimeModal } from "../../components/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useAppSelector } from "@/store/hooks";
import { usePostFetch } from "@/hooks/usePostFetch";

// interface Evento {
// 	id: number;
// 	fecha: string;
// 	hora: string;
// 	titulo: string;
// 	descripcion: string;
// 	ubicacion: string;
// 	imagen: string;
// 	asistentes: string[];
// 	totalAsistentes: number;
// 	estado: "confirmado" | "pendiente" | "cancelado";
// }

// const eventosData: Evento[] = [
// 	{
// 		id: 1,
// 		fecha: "15 JUL, 2024",
// 		hora: "20:00",
// 		titulo: "Concierto Anual de Verano",
// 		descripcion:
// 			"El concierto más esperado del año con artistas nacionales e internacionales. ¡No te lo pierdas!",
// 		ubicacion: "Estadio Nacional, Lima",
// 		imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
// 		asistentes: ["https://i.pravatar.cc/150?img=1", "https://i.pravatar.cc/150?img=2"],
// 		totalAsistentes: 2000,
// 		estado: "confirmado",
// 	},
// 	{
// 		id: 2,
// 		fecha: "22 AGO, 2024",
// 		hora: "09:00",
// 		titulo: "Tech Conference 2024",
// 		descripcion:
// 			"Una jornada de aprendizaje sobre las últimas tendencias en inteligencia artificial y desarrollo web.",
// 		ubicacion: "Centro de Convenciones, Miraflores",
// 		imagen: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
// 		asistentes: ["https://i.pravatar.cc/150?img=3", "https://i.pravatar.cc/150?img=4"],
// 		totalAsistentes: 500,
// 		estado: "pendiente",
// 	},
// 	{
// 		id: 3,
// 		fecha: "05 SEP, 2024",
// 		hora: "14:00",
// 		titulo: "Taller de Fotografía Urbana",
// 		descripcion:
// 			"Aprende técnicas de composición y captura de la esencia de la ciudad con fotógrafos expertos.",
// 		ubicacion: "Barrio de Barranco, Lima",
// 		imagen: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400",
// 		asistentes: ["https://i.pravatar.cc/150?img=5"],
// 		totalAsistentes: 30,
// 		estado: "cancelado",
// 	},
// ];

export const Eventos = () => {
  const addModal = useModal();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const ep =
    user?.rol === "CLIENTE"
      ? `/eventos/usuario/${user?.id}`
      : user?.rol === "ADMIN"
        ? "/eventos"
        : "";

  const getDataEvents = useGetFetch(ep);

  const getEstadoColor = (status: string) => {
    switch (status) {
      case "COMPLETADO":
        return "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "PENDIENTE":
        return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "CANCELADO":
        return "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "EN_PROGRESO":
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "";
    }
  };

  const getEstadoTexto = (status: string) => {
    switch (status) {
      case "COMPLETADO":
        return "Completado";
      case "PENDIENTE":
        return "Pendiente";
      case "CANCELADO":
        return "Cancelado";
      case "EN_PROGRESO":
        return "En Progreso";
      default:
        return "";
    }
  };

  // Función para formatear fecha
  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate();
    const mes = fecha
      .toLocaleDateString("es-ES", { month: "short" })
      .toUpperCase();
    const año = fecha.getFullYear();
    return `${dia} ${mes}, ${año}`;
  };

  // Función para formatear hora
  const formatearHora = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const postEvento = usePostFetch("/eventos", {
    sectionName: "Evento",
    reloadFetchData: getDataEvents.reloadFetchData,
    addModal,
    toastMessages: {
      success: "Evento creado exitosamente",
      error: "Error al crear el Evento",
    },
  });

  return (
    <div className="p-6">
      <ContentBox>
        {/* Title and Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold dark:text-white">Mis Eventos</h2>
          <div className="flex gap-3">
            <CustomButton
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              }
              text="Filtrar por estado"
              backgroundButton="transparent"
              colorP="#64748b"
              additionalClassName="border border-gray-300 dark:border-gray-600"
            />
            <CustomButton
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
              }
              text="Ordenar por"
              backgroundButton="transparent"
              colorP="#64748b"
              additionalClassName="border border-gray-300 dark:border-gray-600"
            />
            <CustomButton
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              }
              text="Crear Evento"
              backgroundButton="var(--primary-color-light)"
              colorP="#ffffff"
              onClick={addModal.onVisibleModal}
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getDataEvents.isLoading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Cargando eventos...</p>
            </div>
          ) : getDataEvents.error ? (
            <div className="col-span-full text-center py-8">
              <p className="text-red-500">Error al cargar los eventos</p>
            </div>
          ) : getDataEvents.data && getDataEvents.data.length > 0 ? (
            getDataEvents.data.map((evento: any) => (
              <div
                key={evento.id}
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-600"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-gray-200">
                  {/* Como el API no devuelve imagen, puedes usar una por defecto o un placeholder */}
                  <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400"
                    alt={evento.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Date and Time */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[var(--primary-color-light)] dark:text-blue-400 font-semibold text-sm">
                      {formatearFecha(evento.fecha)}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      {formatearHora(evento.hora)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 dark:text-white">
                    {evento.titulo}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {evento.descripcion}
                  </p>

                  {/* Location */}
                  <div className="flex items-start gap-2 mb-4">
                    <svg
                      className="w-4 h-4 text-gray-400 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {evento.ubicacion}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-600">
                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(
                        evento.status,
                      )}`}
                    >
                      {getEstadoTexto(evento.status)}
                    </span>

                    {/* Action Button */}
                    <button
                      className="text-[var(--primary-color-light)] dark:text-blue-400 text-sm font-medium hover:underline"
                      onClick={() => navigate(`/eventos/${evento.id}`)}
                    >
                      Ver detalles →
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No tienes eventos creados aún</p>
            </div>
          )}
        </div>
      </ContentBox>

      {/* Modal para Crear Evento */}
      <PrimeModal
        modalStatus={addModal.modalStatus}
        onHideModal={addModal.onHideModal}
        header="Crear Nuevo Evento"
        width={600}
      >
        <AddModal
          postFetchData={postEvento.postFetchData}
          onHideModal={addModal.onHideModal}
        />
      </PrimeModal>
    </div>
  );
};
