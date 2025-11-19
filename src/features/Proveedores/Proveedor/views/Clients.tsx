import type { ProveedorDetalle } from "../Proveedor";
import { useGetFetch } from "@/hooks/useGetFetch";
//import { useGetFetch } from "@/hooks/useGetFetch";

export const Clients = ({
  proveedor,
}: {
  proveedor: (ProveedorDetalle & { userId?: string }) | null;
}) => {
  const providerId = proveedor?.userId;
  const getClients = useGetFetch("/eventos/proveedor/" + providerId);

  const clientData: any[] = getClients.data ?? [];

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatHour = (hourString: string) => {
    if (!hourString) return "—";
    const date = new Date(hourString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusColors: any = {
    PENDIENTE: "text-yellow-600 bg-yellow-100",
    COMPLETADO: "text-green-600 bg-green-100",
    CANCELADO: "text-red-600 bg-red-100",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold dark:text-white">Clientes</h2>
      </div>

      {clientData.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-10">
          No hay eventos registrados.
        </p>
      )}

      <div className="space-y-4">
        {clientData.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
          >
            {/* Cliente */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {event?.User?.nombre} {event?.User?.apellido}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {event?.User?.email}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusColors[event.status] || "bg-gray-100 text-gray-600"
                }`}
              >
                {event.status}
              </span>
            </div>

            <hr className="border-gray-200 dark:border-gray-700 my-3" />

            {/* Información del evento */}
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Información del Evento
            </h4>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Título:
                </span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {event.titulo}
                </p>
              </div>

              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Fecha:
                </span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatDate(event.fecha)}
                </p>
              </div>

              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Hora:
                </span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatHour(event.hora)}
                </p>
              </div>

              <div className="col-span-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Ubicación:
                </span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {event.ubicacion}
                </p>
              </div>

              <div className="col-span-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Descripción:
                </span>
                <p className="font-normal text-gray-900 dark:text-white">
                  {event.descripcion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
