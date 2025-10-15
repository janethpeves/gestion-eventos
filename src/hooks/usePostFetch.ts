/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "@/connections";
// import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { useToastService } from "@/services/useToastService";

// interface PostDataResponse {
//   data: any;
//   token: any;
//   usuario: any;
// }

interface AddModal {
  onHideModal: () => void;
}

interface ToastMessages {
  pending?: string;
  success?: string;
  error?: string;
}

interface UsePostFetchOptions {
  sectionName: string;
  reloadFetchData?: () => void;
  addModal?: AddModal;
  toastMessages?: ToastMessages;
  returnFullResponse?: boolean;
  showToast?: boolean; // Nuevo campo para controlar el toast
}

export const usePostFetch = (
  endPoint: string,
  // sectionName?: string,
  // reloadFetchData?: () => void,
  // addModal?: any,
  // showToast = true, // Valor por defecto del toast a true
  // toastMessages = {},
  {
    sectionName,
    reloadFetchData,
    addModal,
    toastMessages = {},
    returnFullResponse = false,
    showToast = true, // Valor por defecto del toast a true
  }: UsePostFetchOptions
) => {
  const navigate = useNavigate();
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
  const [errorPost, setErrorPost] = useState<any>(null);
  const [successPost, setSuccessPost] = useState<boolean>(false);
  const { showPromiseToast } = useToastService();

  const setInitStatePost = () => {
    setIsLoadingPost(false);
    setErrorPost(null);
    setSuccessPost(false);
  };

  useEffect(() => {
    if (successPost) {
      if (addModal) {
        addModal.onHideModal();
      }
      setInitStatePost();
      if (reloadFetchData) {
        reloadFetchData();
      }
    }
  }, [successPost]);

  const postFetchData = async (
    data: any,
    query?: string,
    isBlob?: boolean,
    pathUrl?: string,
    headers?: any
  ): Promise<any> => {
    setIsLoadingPost(true);

    const promise = api.post(`${endPoint}${query ? `?${query}` : ""}`, data, {
      headers,
      responseType: isBlob ? "blob" : "json",
    });

    if (showToast) {
      showPromiseToast(promise, {
        pending: toastMessages.pending || "Enviando solicitud...",
        success:
          toastMessages.success ||
          `${sectionName} ha sido agregado exitosamente`,
        error: toastMessages.error || "Solicitud fallida!",
      });
    }

    try {
      const resp = await promise;

      setIsLoadingPost(false);
      setSuccessPost(true);

      if (pathUrl) {
        setTimeout(() => {
          navigate(pathUrl);
        }, 500);
      }

      // Retornar respuesta completa o solo los datos
      return returnFullResponse ? resp : resp.data;
    } catch (error: any) {
      setIsLoadingPost(false);
      setErrorPost(error);
      return undefined;
    }
  };

  return {
    postFetchData,
    isLoadingPost,
    errorPost,
  };
};
