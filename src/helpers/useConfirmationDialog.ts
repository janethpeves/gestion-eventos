import { confirmDialog } from "primereact/confirmdialog";
import { useToastService } from "@/services/useToastService";

export const useConfirmationDialog = () => {
  const { showToast } = useToastService();

  const showConfirmation = ({
    message,
    header = "Confirmación",
    icon = "pi pi-exclamation-triangle",
    acceptLabel = "Sí", // Predeterminado a "Sí"
    rejectLabel = "No", // Predeterminado a "No"
    onAccept,
    onReject,
  }: {
    message: string;
    header?: string;
    icon?: string;
    acceptLabel?: string;
    rejectLabel?: string;
    onAccept: () => void;
    onReject?: () => void;
  }) => {
    confirmDialog({
      message,
      header,
      icon,
      acceptLabel,
      rejectLabel,
      accept: async () => {
        try {
          await onAccept();
        
        } catch (error) {
          console.error("Error en la operación:", error);
          showToast("Ocurrió un error al completar la operación.", "error");
        }
      },
      reject: () => {
        if (onReject) {
          onReject();
        }
        showToast("Operación cancelada.", "info");
      },
    });
  };

  return { showConfirmation };
};
