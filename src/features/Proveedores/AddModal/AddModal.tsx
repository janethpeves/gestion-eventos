import { useFormik } from "formik";
import * as Yup from "yup";

import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { Button } from "primereact/button";
import { useGetFetch } from "@/hooks/useGetFetch";
import { TextAreaField } from "@/components/TextAreaField/TextAreaField";

interface PropsAddModal {
	postFetchData?: (data: { name: string }) => void;
	onHideModal?: () => void;
}

export const AddModal = ({ postFetchData, onHideModal }: PropsAddModal) => {
	const getFetchDataRoles = useGetFetch("/roles");

	const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
		initialValues: {
			name: "",
			description: "",
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
			description: Yup.string().required("Este campo es requerido"),
		}),
	});

	return (
		<form noValidate onSubmit={handleSubmit} className="flex flex-col gap-2">
			<div className="space-y-1">
				<TextBoxField
					textLabel="Nombre:"
					value={values.name || ""}
					name={"name"}
					onChange={handleChange}
					onBlur={handleBlur}
					direction="row"
					labelWidth="80px"
				/>
				{touched.name && errors.name && (
					<span className="text-red-500 text-xs font-medium">{errors.name}</span>
				)}
			</div>
			<div className="space-y-1">
				<TextAreaField
					textLabel="Descripción:"
					value={values.description || ""}
					name={"description"}
					onChange={handleChange}
					onBlur={handleBlur}
					direction="row"
					labelWidth="80px"
				/>
				{touched.description && errors.description && (
					<span className="text-red-500 text-xs font-medium">{errors.description}</span>
				)}
			</div>
			
			{postFetchData && (
				<div className="flex justify-end pt-2">
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

const dataFabricantes = [
	{ id: 1, name: "Fabricante 1" },
	{ id: 2, name: "Fabricante 2" },
	{ id: 3, name: "Fabricante 3" },
];