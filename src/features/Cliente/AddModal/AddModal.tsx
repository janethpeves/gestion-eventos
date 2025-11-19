import { useFormik } from "formik";
import * as Yup from "yup";

import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { Button } from "primereact/button";

interface FormValues {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

interface PropsAddModal {
  postFetchData?: (data: FormValues & { rol: string }) => void;
  onHideModal?: () => void;
}

export const AddModal = ({ postFetchData, onHideModal }: PropsAddModal) => {
  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik<FormValues>({
      initialValues: {
        nombre: "",
        apellido: "",
        email: "",
        password: "",
      },
      onSubmit: async (values) => {
        try {
          postFetchData?.({
            ...values,
            rol: "CLIENTE",
          });
        } catch (error) {
          console.log(error);
        } finally {
          onHideModal?.();
        }
      },
      validationSchema: Yup.object({
        nombre: Yup.string().required("Este campo es requerido"),
        apellido: Yup.string().required("Este campo es requerido"),
        email: Yup.string().email().required("Este campo es requerido"),
        password: Yup.string().required("Este campo es requerido"),
      }),
    });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Agregar Información
          </h2>

          <button
            onClick={onHideModal}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-500 font-medium !text-lg">
              Datos del Usuario
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(values).map(([keyName, value], i) => (
                <div key={i} className="space-y-[5px]">
                  <TextBoxField
                    textLabel={keyName.toUpperCase()}
                    value={value}
                    name={`${keyName}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    direction="column"
                  />
                  {touched[keyName as keyof typeof touched] &&
                    errors[keyName as keyof typeof errors] && (
                      <span className="text-red-500 text-xs font-medium">
                        {errors[keyName as keyof typeof errors]}
                      </span>
                    )}
                </div>
              ))}
            </div>
          </div>
          {/* Footer */}
          {postFetchData && (
            <div className="flex justify-end pt-2 gap-2">
              <Button
                type="submit"
                label="Guardar"
                className="p-button-sm p-button-info"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
