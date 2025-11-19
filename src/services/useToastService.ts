// toastService.ts
import { useToast } from "@/contexts/ToastContext";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessages {
  pending?: string;
  success?: string;
  error?: string;
}

interface ApiResponse {
  data?: unknown;
  error?: unknown;
}

export const useToastService = () => {
  const { toast } = useToast();

  const showToast = (message: string, type: ToastType = "success") => {
    if (toast.current) {
      const severity = type === "warning" ? "warn" : type;
      toast.current.show({
        severity,
        summary: message,
        detail: "",
        life: 3000,
      });
    }
  };

  const showPromiseToast = async (
    promise: Promise<ApiResponse>,
    messages: ToastMessages = {},
  ) => {
    const defaultMessages = {
      pending: "Enviando solicitud...",
      success: "Solicitud exitosa!",
      error: "Solicitud fallida!",
      ...messages,
    };

    // Mostrar toast de carga
    if (toast.current) {
      toast.current.show({
        severity: "info",
        summary: defaultMessages.pending,
        detail: "",
        life: 0, // No se cierra automáticamente
      });
    }

    try {
      const result = await promise;

      // Mostrar toast de éxito
      if (toast.current) {
        toast.current.clear();
        toast.current.show({
          severity: "success",
          summary: defaultMessages.success,
          detail: "",
          life: 3000,
        });
      }

      return result;
    } catch (error) {
      // Mostrar toast de error
      if (toast.current) {
        toast.current.clear();
        toast.current.show({
          severity: "error",
          summary: defaultMessages.error,
          detail: "",
          life: 3000,
        });
      }
      throw error;
    }
  };

  return {
    showToast,
    showPromiseToast,
  };
};

