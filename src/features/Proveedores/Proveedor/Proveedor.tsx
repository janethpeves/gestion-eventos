import { useState } from "react";
import { useParams } from "react-router";
import { Calendar } from "primereact/calendar";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { TabMenuPrime } from "@/components/TabMenuPrime/TabMenuPrime";
import type { MenuItem } from "primereact/menuitem";

interface ProveedorDetalle {
  id: number;
  name: string;
  role: string;
  location: string;
  avatar?: string;
  about: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  services: string[];
  availability: Date[];
}

// Datos de ejemplo
const proveedorEjemplo: ProveedorDetalle = {
  id: 1,
  name: "Sophia Carter",
  role: "Event Planner",
  location: "New York, United States",
  avatar: "https://i.pravatar.cc/150?img=1",
  about: "Sophia Carter is a seasoned event planner with over 8 years of experience in creating memorable events. Specializing in weddings, corporate parties, and social gatherings, Sophia brings a unique blend of creativity and meticulous planning to every project. Her passion for detail and commitment to client satisfaction ensure that each event is not only seamless but also reflects the client's vision and style.",
  contact: {
    phone: "(555) 123-4567",
    email: "sophia.carter@gmail.com",
    website: "www.sophiacartevents.com"
  },
  services: [
    "Wedding Planning",
    "Corporate Events",
    "Private Parties",
    "Event Design",
    "Catering Coordination"
  ],
  availability: [
    new Date(2024, 6, 5),  // 5 julio
    new Date(2024, 6, 12), // 12 julio
    new Date(2024, 7, 2),  // 2 agosto
  ]
};

export const Proveedor = () => {
  const { id } = useParams();
  const [proveedor] = useState<ProveedorDetalle>(proveedorEjemplo);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDates, setSelectedDates] = useState<Date[]>(proveedor.availability);

  const tabs: MenuItem[] = [
    { label: "Profile" },
    { label: "Portfolio" },
    { label: "Reviews" },
  ];

  const handleContact = () => {
    console.log("Contactar proveedor:", id);
    // Lógica para contactar al proveedor
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          {/* Profile Info */}
          <div className="flex items-start gap-6 flex-1">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-100 dark:border-gray-700">
              {proveedor.avatar ? (
                <img
                  src={proveedor.avatar}
                  alt={proveedor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {proveedor.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl font-bold dark:text-white mb-1">
                {proveedor.name}
              </h1>
              <p className="text-blue-600 dark:text-blue-400 text-lg mb-2">
                {proveedor.role}
              </p>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">{proveedor.location}</span>
              </div>
            </div>
          </div>

          {/* Contact Button */}
          <CustomButton
            text="Contact Provider"
            onClick={handleContact}
            backgroundButton="#3B82F6"
            colorP="#ffffff"
          />
          {/* Agregar Proveedor Button */}
          {/* <CustomButton
            text="Agregar Servicio"
            onClick={handleAddService}
            backgroundButton="#3B82F6"
            colorP="#ffffff"
          /> */}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <TabMenuPrime
          items={tabs}
          activeIndex={activeTab}
          onTabChange={(e) => setActiveTab(e.index)}
        />
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 0 && (
          <>
            {/* About Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold dark:text-white mb-4">About</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {proveedor.about}
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold dark:text-white mb-4">Contact</h2>
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium dark:text-white">{proveedor.contact.phone}</p>
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium dark:text-white">{proveedor.contact.email}</p>
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                      <p className="font-medium dark:text-white">{proveedor.contact.website}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold dark:text-white mb-4">Services</h2>
              <div className="flex flex-wrap gap-2">
                {proveedor.services.map((service) => (
                  <span
                    key={service}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold dark:text-white mb-4">Availability</h2>
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
                  viewDate={new Date(2024, 7, 1)} // Agosto 2024
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold dark:text-white mb-4">Portfolio</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Portfolio content will be displayed here...
            </p>
          </div>
        )}

        {activeTab === 2 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold dark:text-white mb-4">Reviews</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Reviews content will be displayed here...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};