import { useFormik } from "formik";
import * as Yup from "yup";

import { SelectField } from "@/components/SelectField/SelectField";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { Button } from "primereact/button";
import { useGetFetch } from "@/hooks/useGetFetch";

interface PropsAddModal {
	postFetchData?: (data: { name: string }) => void;
	onHideModal?: () => void;
}

export const AddModal = ({ postFetchData, onHideModal }: PropsAddModal) => {
	const getFetchDataRoles = useGetFetch("/roles");

	const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
		initialValues: {
			name: "",
			firstLastname: "",
			secondLastname: "",
			email: "",
			password: "",
			roleId: "",
		},
		onSubmit: (values) => {
			if (postFetchData) {
				postFetchData(values);
			}
			console.log(values);
			if (onHideModal) {
				onHideModal();
			}
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Este campo es requerido"),
			firstLastname: Yup.string().required("Este campo es requerido"),
			secondLastname: Yup.string().required("Este campo es requerido"),
			email: Yup.string().required("Este campo es requerido"),
			password: Yup.string().required("Este campo es requerido"),
			roleId: Yup.string().required("Este campo es requerido"),
		}),
	});

	return (
		<form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
			<div className="space-y-1">
				<TextBoxField
					textLabel="Nombre:"
					value={values.name || ""}
					name={"name"}
					onChange={handleChange}
					onBlur={handleBlur}
					direction="row"
					labelWidth="100px"
				/>
				{touched.name && errors.name && (
					<span className="text-red-500 text-sm font-medium">{errors.name}</span>
				)}
			</div>
			<div className="space-y-1">
				<TextBoxField
					textLabel="Apellido Paterno:"
					value={values.firstLastname || ""}
					name={"firstLastname"}
					onChange={handleChange}
					onBlur={handleBlur}
					direction="row"
					labelWidth="100px"
				/>
				{touched.firstLastname && errors.firstLastname && (
					<span className="text-red-500 text-sm font-medium">{errors.firstLastname}</span>
				)}
			</div>
			<div className="space-y-1">
				<TextBoxField
					textLabel="Apellido Materno:"
					value={values.secondLastname || ""}
					name={"secondLastname"}
					onChange={handleChange}
					onBlur={handleBlur}
					direction="row"
					labelWidth="100px"
				/>
				{touched.secondLastname && errors.secondLastname && (
					<span className="text-red-500 text-sm font-medium">{errors.secondLastname}</span>
				)}
			</div>
			<div className="space-y-1">
				<TextBoxField
					textLabel="Correo:"
					value={values.email || ""}
					name={"email"}
					onChange={handleChange}
					onBlur={handleBlur}
					direction="row"
					labelWidth="100px"
				/>
				{touched.email && errors.email && (
					<span className="text-red-500 text-sm font-medium">{errors.email}</span>
				)}
			</div>
			<div className="space-y-1">
				<TextBoxField
					textLabel="Contraseña:"
					type="password"
					value={values.password || ""}
					name={"password"}
					onChange={handleChange}
					onBlur={handleBlur}
					direction="row"
					labelWidth="100px"
				/>
				{touched.password && errors.password && (
					<span className="text-red-500 text-sm font-medium">{errors.password}</span>
				)}
			</div>
			<div className="space-y-1">
				<SelectField
					textLabel="Rol:"
					value={values.roleId || ""}
					name={"roleId"}
					onChange={handleChange}
					onBlur={handleBlur}
					direction="row"
					labelWidth="100px"
					options={getFetchDataRoles?.data?.data || []}
					optionLabel="name"
					optionValue="id"
				/>
				{touched.roleId && errors.roleId && (
					<span className="text-red-500 text-sm font-medium">{errors.roleId}</span>
				)}
			</div>
			{postFetchData && (
				<div className="flex justify-end pt-4">
					<Button className="p-button-sm p-button-info mr-2" type="submit">
						GUARDAR
					</Button>
				</div>
			)}

			{/* {updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" type="submit">
						GUARDAR
					</Button>
				</div>
			)} */}
		</form>
	);
};
