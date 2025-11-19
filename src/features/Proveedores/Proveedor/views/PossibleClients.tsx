import type { ProveedorDetalle } from "../Proveedor";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePostFetch } from "@/hooks/usePostFetch";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { clearClient } from "@/store/slices/clients";
//import { useGetFetch } from "@/hooks/useGetFetch";

export const PossiblesClients = ({
  proveedor,
}: {
  proveedor: (ProveedorDetalle & { userId?: string }) | null;
}) => {
  const dispatch = useAppDispatch();
  //const providerId = proveedor?.userId;
  //const getClients = useGetFetch("/companies/user/" + providerId);
  //const clients = getClients.data;
  const clientData = useAppSelector((state) => state.client);
  const asignClient = usePostFetch("/eventos", {
    sectionName: "Proveedor",
    toastMessages: {
      error: "Algo Salío Mal",
      pending: "Asignando Cliente",
      success: "¡Cliente Asignado Existosamente!",
    },
  });
  const onAsignClient = (data: any) => {
    asignClient.postFetchData(
      { companyId: proveedor?.userId },
      `/${data?.client?.id}/proveedor`,
    );
    dispatch(clearClient(data));
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold dark:text-white">Clientes</h2>
      </div>
      <div>
        <label className="text-gray-500 dark:text-gray-400 text-sm block mb-3">
          Posibles Clientes
        </label>
        <div className="space-y-4">
          {clientData?.map((data, key) => (
            <div
              key={key}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              {/* Cliente */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {data?.client?.nombre}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {data?.client?.email}
                  </p>
                </div>
                <div className="flex gap-2">
                  <CustomButton
                    text="Aceptar Cliente"
                    onClick={() => onAsignClient(data)}
                  />
                  <CustomButton
                    text="Rechazar Cliente"
                    onClick={() => {
                      dispatch(clearClient(data));
                    }}
                  />
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-700 my-3" />

              {/* Evento */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Información del Evento
                </h4>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  {data?.event &&
                    Object.entries(data.event).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="capitalize font-medium">{key}:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
