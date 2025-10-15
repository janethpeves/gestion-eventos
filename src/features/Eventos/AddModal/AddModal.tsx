import { useFormik } from "formik";
import * as Yup from "yup";

import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { TextAreaField } from "@/components/TextAreaField/TextAreaField";
import { DateField } from "@/components/DateField/DateField";
import { SelectField } from "@/components/SelectField/SelectField";
import { Calendar } from "primereact/calendar";
import { CustomButton } from "@/components/CustomButton/CustomButton";

interface PropsAddModal {
	postFetchData?: (data: EventoFormData) => void;
	onHideModal?: () => void;
}

interface EventoFormData {
	titulo: string;
	descripcion: string;
	fecha: Date | null;
	hora: Date | null;
	ubicacion: string;
	estado: string;
}

export const AddModal = ({ postFetchData, onHideModal }: PropsAddModal) => {
	const estadoOptions = [
		{ name: "Confirmado", value: "confirmado" },
		{ name: "Pendiente", value: "pendiente" },
		{ name: "Cancelado", value: "cancelado" },
	];

	const { values, handleSubmit, handleChange, handleBlur, errors, touched, setFieldValue } = useFormik({
		initialValues: {
			titulo: "",
			descripcion: "",
			fecha: null,
			hora: null,
			ubicacion: "",
			estado: "",
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
			titulo: Yup.string().required("Este campo es requerido"),
			descripcion: Yup.string().required("Este campo es requerido"),
			fecha: Yup.date().nullable().required("Este campo es requerido"),
			hora: Yup.date().nullable().required("Este campo es requerido"),
			ubicacion: Yup.string().required("Este campo es requerido"),
			estado: Yup.string().required("Este campo es requerido"),
		}),
	});

	return (
		<form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
			{/* Event Title */}
			<div className="space-y-1">
				<TextBoxField
					textLabel="Título"
					value={values.titulo || ""}
					name="titulo"
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Enter event title"
				/>
				{touched.titulo && errors.titulo && (
					<span className="text-red-500 text-xs font-medium">{errors.titulo}</span>
				)}
			</div>

			{/* Description */}
			<div className="space-y-1">
				<TextAreaField
					textLabel="Descripción"
					value={values.descripcion || ""}
					name="descripcion"
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Describe your event"
					rows={4}
					toUpperCase={false}
				/>
				{touched.descripcion && errors.descripcion && (
					<span className="text-red-500 text-xs font-medium">{errors.descripcion}</span>
				)}
			</div>

			{/* Date */}
			<div className="space-y-1">
				<DateField
					textLabel="Fecha"
					name="fecha"
					value={values.fecha}
					onChange={(e: any) => setFieldValue("fecha", e.value)}
					dateFormat="dd/mm/yy"
				/>
				{touched.fecha && errors.fecha && (
					<span className="text-red-500 text-xs font-medium">{errors.fecha}</span>
				)}
			</div>

			{/* Time */}
			<div className="space-y-1">
				<div className="flex flex-col gap-1">
					<label className="text-gray-700 dark:text-gray-300 text-base">
						Hora
					</label>
					<Calendar
						value={values.hora}
						onChange={(e) => setFieldValue("hora", e.value)}
						timeOnly
						hourFormat="24"
						placeholder="Select time"
						className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
						style={{ height: "32px", fontSize: "12px" }}
					/>
				</div>
				{touched.hora && errors.hora && (
					<span className="text-red-500 text-xs font-medium">{errors.hora}</span>
				)}
			</div>

			{/* Location */}
			<div className="space-y-1">
				<TextBoxField
					textLabel="Ubicación"
					value={values.ubicacion || ""}
					name="ubicacion"
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Enter location"
				/>
				{touched.ubicacion && errors.ubicacion && (
					<span className="text-red-500 text-xs font-medium">{errors.ubicacion}</span>
				)}
			</div>

			{/* Status */}
			<div className="space-y-1">
				<SelectField
					textLabel="Estado"
					name="estado"
					value={values.estado}
					onChange={(e) => setFieldValue("estado", e.value)}
					options={estadoOptions}
					optionLabel="name"
					optionValue="value"
					placeholder="Select status"
				/>
				{touched.estado && errors.estado && (
					<span className="text-red-500 text-xs font-medium">{errors.estado}</span>
				)}
			</div>

			{/* Buttons */}
			{postFetchData && (
				<div className="flex justify-end gap-3 pt-2">
					<CustomButton
						text="GUARDAR"
						onClick={handleSubmit}
						type="submit"
						backgroundButton="var(--primary-color-light)"
						colorP="#ffffff"
					/>
				</div>
			)}
		</form>
	);
};