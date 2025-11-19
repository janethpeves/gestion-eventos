import { useState, type ReactElement } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { TabMenuPrime } from "@/components/TabMenuPrime/TabMenuPrime";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RenderStars } from "@/components/RenderStars/RenderStars";
import { Profile } from "./views/Profile";
import { Reviews } from "./views/Reviews";
import type { MenuItem } from "primereact/menuitem";
import { PossiblesClients } from "./views/PossibleClients";
import { setClient } from "@/store/slices/clients";
import api from "@/connections";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/components/PrimeModal/PrimeModal";
import { CommentForm } from "../ReferenceModal/ReferenceModal";
import { Clients } from "./views/Clients";

type MenuItemWithChildren = MenuItem & { children: ReactElement };

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

interface Review {
  id: number;
  clientName: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ProveedorDetalle {
  id: string;
  nombre: string;
  servicio: string;
  ubicacion: string;
  nosotros: string;
  descripcion: string;
  telefono: string;
  email: string;
  website: string;
  puntaje: number;
  cantidad_calificaciones: number;
  User?: {
    id: string;
    nombre: string;
    apellido: string;
  };
  references?: {
    comment: string;
    rating: number;
    userId: string;
  }[];
  portfolio?: PortfolioItem[];
  reviews?: Review[];
}

interface ReferenceProps {
  comment: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
}

export const Proveedor = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const eventId = state?.eventId;
  const referenceModal = useModal();

  const ep =
    user?.rol === "PROVEEDOR"
      ? `/companies/user/${user.id}`
      : `/companies/${id}`;

  const { data, isLoading, reloadFetchData, error } = useGetFetch(ep);

  const proveedor: ProveedorDetalle | null = data;
  //const averageRating = proveedor?.puntaje || 0;

  const averageRating =
    proveedor?.references && proveedor.references.length > 0
      ? proveedor.references.reduce((acc, item) => acc + item.rating, 0) /
        proveedor.references.length
      : 0;

  const { postFetchData: postReference } = usePostFetch(
    `/companies/${proveedor?.id}/reference`,
    {
      sectionName: "Reseña",
      reloadFetchData,
      toastMessages: {
        error: "Error al cargar la reseña",
        pending: "Guardando reseña...",
        success: "Reseña guardada exitosamente!",
      },
    },
  );

  const tabs: MenuItemWithChildren[] = [
    { label: "Perfil", children: <Profile proveedor={proveedor} /> },
    {
      label: "Clientes",
      children: <Clients proveedor={proveedor} />,
      disabled: user?.rol === "CLIENTE",
    },
    {
      label: "Posibles Clientes",
      children: <PossiblesClients proveedor={proveedor} />,
      disabled: user?.rol === "CLIENTE",
    },
    //{ label: "Portafolio" },
    { label: "Reseñas", children: <Reviews proveedor={proveedor} /> },
  ];

  const handleContact = async () => {
    try {
      const res = await api.get(`/eventos/${eventId}`);
      if (res) {
        dispatch(
          setClient({
            client: {
              email: user?.email as string,
              id: eventId,
              nombre: user?.nombre as string,
            },
            event: {
              detalle: res.data?.descripcion,
              fecha: res.data?.fecha,
              ubicacion: res.data?.ubicacion,
              nombre: res.data?.titulo,
            },
          }),
        );
      }
      await api.get(
        `/eventos/email?nombreCliente=${user?.nombre}&nombreProveedor=${proveedor?.nombre}`,
      );
      navigate(`/eventos/${eventId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onPostReference = (data: ReferenceProps) => {
    postReference({ ...data, userId: user?.id });
    referenceModal.onHideModal();
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">
              Cargando proveedor...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !proveedor) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">Error al cargar el proveedor</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          {/* Profile Info */}
          <div className="flex items-start gap-6 flex-1">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-100 dark:border-gray-700">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {proveedor.nombre.charAt(0)}
                </span>
              </div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl font-bold dark:text-white mb-1">
                {proveedor.nombre}
              </h1>
              <p className="text-[--primary-color-lightvar(--primary-color-light)] dark:text-blue-400 text-lg mb-2">
                {proveedor.servicio}
              </p>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
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
                <span className="text-sm">{proveedor.ubicacion}</span>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {RenderStars(Math.round(averageRating))}
                </div>
                <span className="text-sm font-semibold dark:text-white">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({proveedor?.references?.length || 0} calificaciones)
                </span>
              </div>
            </div>
          </div>

          {/* Contact Button */}
          {user?.rol === "CLIENTE" && (
            <>
              <CustomButton
                text="Escribir una Reseña"
                onClick={referenceModal.onVisibleModal}
                backgroundButton="var(--primary-color-light)"
                colorP="#ffffff"
              />
              <CustomButton
                text="Contactar Proveedor"
                onClick={handleContact}
                backgroundButton="var(--primary-color-light)"
                colorP="#ffffff"
              />
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5">
        <TabMenuPrime
          items={tabs}
          activeIndex={activeTab}
          onTabChange={(e) => setActiveTab(e.index)}
        />
      </div>
      <div className="space-y-6">{tabs[activeTab as number].children}</div>
      <PrimeModal
        onHideModal={referenceModal.onHideModal}
        modalStatus={referenceModal.modalStatus}
        header="Comparte tu reseña."
      >
        <CommentForm onSubmit={onPostReference} />
      </PrimeModal>
    </div>
  );
};
