import { useEffect, useState } from "react";
// import axios, { AxiosResponse } from "axios";
import { url } from "@/connections/mainApi";
import axios from "axios";
import { useToastService } from "@/services/useToastService";

interface AddModal {
  onHideModal: () => void;
}

interface UpdateData {
  [key: string]: string | number | boolean | undefined;
}

export const useUpdateFetch = (
  endPoint: string,
  sectionName: string | undefined,
  reloadFetchData?: () => void,
  addModal?: AddModal
) => {
  const { showPromiseToast } = useToastService();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [errorUpdate, setErrorUpdate] = useState<Error | null>(null);
  const [successUpdate, setSuccessUpdate] = useState<boolean>(false);

  const setInitStateUpdate = () => {
    setIsLoadingUpdate(false);
    setErrorUpdate(null);
    setSuccessUpdate(false);
  };

  useEffect(() => {
    if (successUpdate) {
      if (addModal) {
        addModal.onHideModal();
      }
      setInitStateUpdate();
      if (reloadFetchData) {
        reloadFetchData();
      }
    }
  }, [successUpdate]);

  // 	const updateFetchData = async (
  // 		id: string,
  // 		data: UpdateData,
  // 		additional?: string,
  // 	): Promise<AxiosResponse | undefined> => {
  // 		try {
  // 			setIsLoadingUpdate(true);

  // 			// const token = localStorage.getItem("rt__colas");
  // 			// const headers = {
  // 			// 	Authorization: `Bearer ${token}`,
  // 			// };

  // 			const response = await axios.patch(
  // 				`${url}${endPoint}/${id}/${additional}`,
  // 				data,
  // 				// {
  // 				// 	headers,
  // 				// }
  // 			);

  // 			setIsLoadingUpdate(false);
  // 			setSuccessUpdate(true);
  // 			return response;
  // 		} catch (error) {
  // 			setIsLoadingUpdate(false);
  // 			setErrorUpdate(error as Error);
  // 			return undefined;
  // 		}
  // 	};

  // 	return {
  // 		updateFetchData,
  // 		isLoadingUpdate,
  // 	};
  // };

  const updateFetchData = async (id: string, data: UpdateData) => {
    setIsLoadingUpdate(true);

    const promise = axios.patch(`${url}${endPoint}/${id}`, data);
    
    if (sectionName) {
      showPromiseToast(promise, {
        pending: "Actualizando...",
        success: `${sectionName} ha sido actualizado exitosamente`,
        error: `Error al actualizar ${sectionName}`,
      });
    }

    try {
      const response = await promise;
      setIsLoadingUpdate(false);
      setSuccessUpdate(true);
      return response.data;
    } catch (patchError) {
      console.warn("PATCH falló", patchError);
      setIsLoadingUpdate(false);
      setErrorUpdate(patchError as Error);
      setSuccessUpdate(false);
      throw patchError;
    }
  };

  return {
    updateFetchData,
    isLoadingUpdate,
    errorUpdate,
    successUpdate,
  };
};
