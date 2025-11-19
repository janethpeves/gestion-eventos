import { DataTablePrime } from "@/components/DataTablePrime/DataTablePrime";
import { PrimeModal } from "@/components/PrimeModal/PrimeModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useModal } from "@/hooks/useModal";
import { usePostFetch } from "@/hooks/usePostFetch";
import { AddModal } from "./AddModal/AddModal";
import { CustomButton } from "@/components/CustomButton/CustomButton";

export const Clientes = () => {
  const addModal = useModal();
  const getData = useGetFetch("/usuarios");
  const data = getData.data || [];
  const registerUser = usePostFetch("/auth/register", {
    sectionName: "Registrando Usuario",
    toastMessages: {
      success: "¡Usuario Registrado Exitosamente!",
      error: "Ocurrió un error mientras se registraba al usuario",
      pending: "Registrando Usuario...",
    },
  });
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Listado de Clientes
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Listado detallado de todos los clientes registrados
          </p>
        </div>

        <CustomButton
          text="Agregar Cliente"
          onClick={() => addModal.onVisibleModal()}
          backgroundButton="var(--primary-color-light)"
          colorP="#ffffff"
          additionalClassName="shadow-md hover:shadow-lg transition-all"
        />
      </div>

      {/* TABLE CONTAINER */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-4">
        <DataTablePrime columns={columns} data={data} />
      </div>

      {/* MODAL */}
      <PrimeModal
        header="Agregar Cliente"
        modalStatus={addModal.modalStatus}
        onHideModal={addModal.onHideModal}
        width={520}
      >
        <div className="p-1">
          <AddModal
            postFetchData={registerUser.postFetchData}
            onHideModal={addModal.onHideModal}
          />
        </div>
      </PrimeModal>
    </div>
  );
};

const columns = [
  { nombre: "Nombre", campo: "nombre" },
  { nombre: "Apellido", campo: "apellido" },
  { nombre: "Correo", campo: "email" },
  { nombre: "Proveedor", campo: "company.name" },
  { nombre: "Rol", campo: "rol" },
  { nombre: "Fecha de Creación", campo: "createdAt" },
];
