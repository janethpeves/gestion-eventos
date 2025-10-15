import { useState, useEffect } from "react";
import { url } from "@/connections/mainApi.js";
import { useConfirmationDialog } from "@/helpers/useConfirmationDialog";
import api from "@/connections";
import { useToastService } from "@/services/useToastService";

export const useDeleteFetch = (
  endPoint: string,
  sectionName: string,
  reloadFetchData?: () => void,
) => {
  const { showPromiseToast } = useToastService();
  const { showConfirmation } = useConfirmationDialog();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState<unknown | null>(null);
  const [successDelete, setSuccessDelete] = useState<boolean>(false);

  const setInitStateDelete = () => {
    setIsLoadingDelete(false);
    setErrorDelete(null);
    setSuccessDelete(false);
  };

  useEffect(() => {
    if (successDelete) {
      setInitStateDelete();
      if (reloadFetchData) {
        reloadFetchData();
      }
    }
  }, [reloadFetchData, successDelete]);

  /**
   * Función para eliminar un elemento después de la confirmación
   */
  const deleteFetchData = async (ids: string[]) => {
    setIsLoadingDelete(true);

    const promise = api.delete(
      `${url}${endPoint}/${ids && ids.filter(Boolean).join("/")}`,
    );

    showPromiseToast(promise, {
      pending: "Eliminando...",
      success: `${sectionName} ha sido eliminado exitosamente`,
      error: `No se pudo eliminar ${sectionName}`,
    });

    try {
      await promise;
      setSuccessDelete(true);
    } catch (error) {
      console.error("Error al eliminar:", error);
      setErrorDelete(error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  /**
   * Función para mostrar el diálogo de confirmación antes de eliminar
   */
  const confirmDelete = (ids: string[]) => {
    showConfirmation({
      message: `¿Estás seguro de que deseas eliminar este ${sectionName}?`,
      header: "Confirmar Eliminación",
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",
      onAccept: () => deleteFetchData(ids),
    });
  };

  return {
    confirmDelete, // Ahora este método se usará en lugar de deleteFetchData directamente
    isLoadingDelete,
    errorDelete,
    successDelete,
  };
};
