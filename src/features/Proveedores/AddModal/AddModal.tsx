import { useFormik } from "formik";
import * as Yup from "yup";

import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { TextAreaField } from "@/components/TextAreaField/TextAreaField";
import { usePostFetch } from "@/hooks/usePostFetch";

interface Provider {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

interface Company {
  nombre: string;
  nosotros: string;
  telefono: string;
  website: string;
  ubicacion: string;
  servicio: string;
}

interface FormValues {
  descripcion: string;
  company: Company;
  provider: Provider;
  rol: string;
}

interface PropsAddModal {
  postFetchData?: (data: any) => void;
  onHideModal?: () => void;
}

export const AddModal = ({ postFetchData, onHideModal }: PropsAddModal) => {
  const registerUser = usePostFetch("/auth/register", {
    sectionName: "Registrando Usuario",
    toastMessages: {
      success: "¡Usuario Registrado Exitosamente!",
      error: "Ocurrió un error mientras se registraba al usuario",
      pending: "Registrando Usuario...",
    },
  });
  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik<FormValues>({
      initialValues: {
        descripcion: "",
        company: {
          nombre: "",
          nosotros: "",
          telefono: "",
          website: "",
          ubicacion: "",
          servicio: "",
        },
        provider: {
          nombre: "",
          apellido: "",
          email: "",
          password: "",
        },
        rol: "PROVEEDOR",
      },
      onSubmit: async (values) => {
        try {
          const res = await registerUser.postFetchData({
            ...values.provider,
            rol: values.rol,
          });
          if (res.user.id) {
            postFetchData?.({
              ...values.company,
              descripcion: values.descripcion,
              userId: res?.user?.id,
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
          onHideModal?.();
        }
      },
      validationSchema: Yup.object({
        descripcion: Yup.string().required("Este campo es requerido"),
        company: Yup.object({
          nombre: Yup.string().required("Este campo es requerido"),
          nosotros: Yup.string().required("Este campo es requerido"),
          telefono: Yup.string().required("Este campo es requerido"),
          website: Yup.string().required("Este campo es requerido"),
          ubicacion: Yup.string().required("Este campo es requerido"),
          servicio: Yup.string().required("Este campo es requerido"),
        }),
        provider: Yup.object({
          nombre: Yup.string().required("Este campo es requerido"),
          apellido: Yup.string().required("Este campo es requerido"),
          email: Yup.string().email().required("Este campo es requerido"),
          password: Yup.string().required("Este campo es requerido"),
        }),
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
              {Object.entries(values.provider).map(([keyName, value], i) => (
                <div key={i} className="space-y-[5px]">
                  <TextBoxField
                    textLabel={keyName.toUpperCase()}
                    value={value}
                    name={`provider[${keyName}]`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    direction="column"
                  />
                  {touched.provider?.[keyName as keyof Provider] &&
                    errors.provider?.[keyName as keyof Provider] && (
                      <span className="text-red-500 text-xs font-medium">
                        {errors.provider?.[keyName as keyof Provider]}
                      </span>
                    )}
                </div>
              ))}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-3">
            <h3 className="text-gray-500 font-medium !text-lg">
              Datos de la compañía
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(values.company).map(([keyName, value], i) => (
                <div key={i} className="space-y-[5px]">
                  <TextBoxField
                    textLabel={keyName.toUpperCase()}
                    value={value}
                    name={`company[${keyName}]`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    direction="column"
                  />
                  {touched.company?.[keyName as keyof Company] &&
                    errors.company?.[keyName as keyof Company] && (
                      <span className="text-red-500 text-xs font-medium">
                        {errors.company?.[keyName as keyof Company]}
                      </span>
                    )}
                </div>
              ))}
            </div>
            <div className="space-y-[5px]">
              <TextAreaField
                textLabel="DESCRIPCIÓN"
                value={values.descripcion}
                name="descripcion"
                onChange={handleChange}
                onBlur={handleBlur}
                direction="column"
              />
              {touched.descripcion && errors.descripcion && (
                <span className="text-red-500 text-xs font-medium">
                  {errors.descripcion}
                </span>
              )}
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

