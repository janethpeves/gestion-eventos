import { useState } from "react";
import { Calendar } from "primereact/calendar";
import type { ProveedorDetalle } from "../Proveedor";

export const Profile = ({
  proveedor,
}: {
  proveedor: ProveedorDetalle | null;
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  return (
    <>
      {/* About Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold dark:text-white mb-4">Acerca de</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {proveedor?.nosotros || proveedor?.descripcion}
        </p>
      </div>

      {/* Description Section */}
      {proveedor?.descripcion && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold dark:text-white mb-4">
            Descripción
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {proveedor.descripcion}
          </p>
        </div>
      )}

      {/* Contact Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold dark:text-white mb-4">Contacto</h2>
        <div className="space-y-4">
          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Teléfono
                </p>
                <a
                  href={`tel:${proveedor?.telefono}`}
                  className="font-medium dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {proveedor?.telefono}
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <a
                  href={`mailto:${proveedor?.email}`}
                  className="font-medium dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {proveedor?.email}
                </a>
              </div>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sitio web
                </p>
                <a
                  href={`https://${proveedor?.website.replace(/^https?:\/\//, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {proveedor?.website}
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <svg
                className="w-5 h-5 text-gray-400"
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
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ubicación
                </p>
                <p className="font-medium dark:text-white">
                  {proveedor?.ubicacion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold dark:text-white mb-4">Servicios</h2>
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
            {proveedor?.servicio}
          </span>
        </div>
      </div>

      {/* Availability Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold dark:text-white mb-4">
          Disponibilidad
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Selecciona las fechas para consultar disponibilidad
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Calendar
            value={selectedDates}
            onChange={(e) => setSelectedDates(e.value as Date[])}
            inline
            selectionMode="multiple"
            className="w-full dark:bg-gray-800"
            dateFormat="dd/mm/yy"
          />
          <Calendar
            value={selectedDates}
            onChange={(e) => setSelectedDates(e.value as Date[])}
            inline
            selectionMode="multiple"
            className="w-full dark:bg-gray-800"
            dateFormat="dd/mm/yy"
            viewDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
          />
        </div>
      </div>
    </>
  );
};
