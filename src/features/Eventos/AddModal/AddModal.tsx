import { useFormik } from "formik";
import * as Yup from "yup";

import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { TextAreaField } from "@/components/TextAreaField/TextAreaField";
import { DateField } from "@/components/DateField/DateField";
import { Calendar } from "primereact/calendar";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { useAppSelector } from "@/store/hooks";

interface PropsAddModal {
	postFetchData?: (data: EventoFormDataAPI) => void;  
	onHideModal?: () => void;
}

interface EventoFormDataAPI {
	titulo: string;
	descripcion: string;
	fecha: string;  // ISO string
	hora: string;   // ISO string
	ubicacion: string;
	userId: string;
}

export const AddModal = ({ postFetchData, onHideModal }: PropsAddModal) => {
	// Obtener el usuario actual
	const { user } = useAppSelector((state: any) => state.auth);

	const { values, handleSubmit, handleChange, handleBlur, errors, touched, setFieldValue } = useFormik({
		initialValues: {
			titulo: "",
			descripcion: "",
			fecha: null,
			hora: null,
			ubicacion: "",
		},
		onSubmit: (values) => {
			if (postFetchData && values.fecha && values.hora) {
				// Transformar los datos al formato del API
				const dataParaAPI: EventoFormDataAPI = {
					titulo: values.titulo,
					descripcion: values.descripcion,
					fecha: values.fecha?.toISOString(),  // Convertir a ISO string
					hora: values.hora?.toISOString(),    // Convertir a ISO string
					ubicacion: values.ubicacion,
					userId: user.id,  // Agregar el userId del usuario actual
				};
				
				postFetchData(dataParaAPI);
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
					placeholder="Ingresa el título del evento"
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
					placeholder="Describe tu evento"
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
						placeholder="Selecciona la hora"
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
					placeholder="Ingresa la ubicación"
				/>
				{touched.ubicacion && errors.ubicacion && (
					<span className="text-red-500 text-xs font-medium">{errors.ubicacion}</span>
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