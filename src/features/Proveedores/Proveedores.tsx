import { useState } from "react";
import { useNavigate } from "react-router";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/components/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { PiPlus } from "react-icons/pi";
import { TabMenuPrime } from "@/components/TabMenuPrime/TabMenuPrime";
import type { MenuItem } from "primereact/menuitem";
import { Paginator } from "primereact/paginator";

interface Proveedor {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  logo?: string;
  logoColor?: string;
}

const proveedoresData: Proveedor[] = [
  {
    id: 1,
    name: "Culinary Catering",
    category: "catering",
    rating: 4.9,
    reviews: 120,
    description: "Exquisite catering services for all types of events.",
    logoColor: "bg-orange-100",
    logo: "🍽️"
  },
  {
    id: 2,
    name: "Grand Occasions Venue",
    category: "venues",
    rating: 4.7,
    reviews: 238,
    description: "Elegant venues for weddings, parties, and corporate events.",
    logoColor: "bg-amber-900",
    logo: "🏛️"
  },
  {
    id: 3,
    name: "Picture Perfect Photography",
    category: "photographers",
    rating: 4.8,
    reviews: 95,
    description: "Capture beautiful moments for your special moments.",
    logoColor: "bg-gray-100",
    logo: "📷"
  },
  {
    id: 4,
    name: "Decor Dreams",
    category: "decorators",
    rating: 4.6,
    reviews: 67,
    description: "Stunning decorations for weddings and event's ambiance.",
    logoColor: "bg-amber-900",
    logo: "🎨"
  },
  {
    id: 5,
    name: "Gourmet Catering Co.",
    category: "catering",
    rating: 4.5,
    reviews: 156,
    description: "Premium catering services with gourmet cuisine options.",
    logoColor: "bg-orange-100",
    logo: "👨‍🍳"
  },
  {
    id: 6,
    name: "Sound & Vision Solutions",
    category: "venues",
    rating: 4.9,
    reviews: 201,
    description: "Top-tier AV equipment and technical support.",
    logoColor: "bg-green-800",
    logo: "AV"
  },
];

export const Proveedores = () => {
  const addModal = useModal();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);

  const categoryTabs: MenuItem[] = [
    { label: "All", command: () => setActiveCategory("all") },
    { label: "Catering", command: () => setActiveCategory("catering") },
    { label: "Venues", command: () => setActiveCategory("venues") },
    { label: "Photographers", command: () => setActiveCategory("photographers") },
    { label: "Decorators", command: () => setActiveCategory("decorators") },
  ];

  const filteredProveedores = proveedoresData.filter((proveedor) => {
    const matchesCategory = activeCategory === "all" || proveedor.category === activeCategory;
    const matchesSearch = proveedor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proveedor.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const paginatedProveedores = filteredProveedores.slice(first, first + rows);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < fullStars
                ? "text-yellow-400 fill-current"
                : index === fullStars && hasHalfStar
                ? "text-yellow-400 fill-current"
                : "text-gray-300 fill-current"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold dark:text-white mb-2">Servicios de Proveedores</h1>
          <p className="text-[var(--primary-color-light)] dark:text-blue-400 text-sm">
            Busca y selecciona servicios de proveedores para tu evento.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar proveedores"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <CustomButton
            text="Agregar Proveedor"
            onClick={addModal.onVisibleModal}
            icon={<PiPlus size={16} />}
            backgroundButton="var(--primary-color-light)"
            colorP="#fff"
          />
        </div>

        {/* Category Tabs */}
        <div>
          <TabMenuPrime
            items={categoryTabs}
            activeIndex={categoryTabs.findIndex((tab) => 
              tab.command && activeCategory === (tab.label?.toLowerCase() || "all")
            )}
            onTabChange={(e) => {
              const selected = categoryTabs[e.index];
              setActiveCategory(selected.label?.toLowerCase() || "all");
              setFirst(0); // Reset pagination
            }}
          />
        </div>

        {/* Available Providers */}
        <div>
          <h2 className="text-xl font-bold dark:text-white mb-4">Proveedores Disponibles</h2>
          
          {paginatedProveedores.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No se encontraron proveedores
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedProveedores.map((proveedor) => (
                <div
                  key={proveedor.id}
                  className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className={`w-16 h-16 ${proveedor.logoColor} rounded-lg flex items-center justify-center flex-shrink-0 text-2xl`}>
                      {proveedor.logo}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold dark:text-white mb-1">
                        {proveedor.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(proveedor.rating)}
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {proveedor.rating} • {proveedor.reviews} reseñas
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {proveedor.description}
                      </p>
                    </div>

                    {/* View Details Button */}
                    <CustomButton
                      text="Ver Detalles"
                      onClick={() => navigate(`/proveedores/${proveedor.id}`)}
                      backgroundButton="transparent"
                      colorP="var(--primary-color-light)"
                      additionalClassName="border border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredProveedores.length > rows && (
            <div className="mt-6">
              <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredProveedores.length}
                onPageChange={onPageChange}
                className="dark:bg-gray-800"
              />
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <PrimeModal
        header="Agregar Proveedor"
        modalStatus={addModal.modalStatus}
        onHideModal={addModal.onHideModal}
        width={500}
      >
        <AddModal postFetchData={() => {}} onHideModal={addModal.onHideModal} />
      </PrimeModal>
    </>
  );
};