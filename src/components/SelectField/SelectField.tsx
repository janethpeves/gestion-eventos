// import React from "react";
import { Dropdown } from "primereact/dropdown";

interface SelectFieldProps {
	textLabel?: string;
	value: string | undefined | number | boolean;
	name: string;
	placeholder?: string;
	optionLabel?: string;
	optionValue?: string;
	onChange: (e: any) => void;
	options: any[];
	direction?: "row" | "column";
	labelWidth?: string;
	onBlur?: any;
	disabled?: boolean;
	containerWidth?: string; // Nueva propiedad
	errorMessage?: string; // Nueva propiedad
}

export const SelectField = ({
	textLabel,
	value,
	name,
	placeholder = "Seleccione una opción",
	optionLabel = "name",
	optionValue = "value",
	onChange,
	options,
	direction = "column",
	labelWidth = "100%",
	onBlur,
	containerWidth = "100%", // Valor por defecto para el contenedor
	disabled = false,
	errorMessage,
}: SelectFieldProps) => {
	const styles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "12px",
	};
	const stylesContainer: React.CSSProperties = {
		width: containerWidth,
		minWidth: "100px",
	};

	const formattedOptions = options?.map((option) => ({
		label: option[optionLabel],
		value: optionValue ? option[optionValue] : option,
	}));

	return (
		<div className="w-full flex flex-col gap-1" style={stylesContainer}>
			{/* Contenedor interno que soporta las direcciones row y column */}
			<div
				className={`w-full grid gap-1 ${
					direction === "column" ? "grid-cols-1" : "grid-cols-[max-content_1fr] items-center"
				}`}
			>
				{textLabel ? <label className="text-gray-700 dark:text-gray-300" style={styles}>{textLabel}</label> : null}

				<Dropdown
					className={`w-full h-10 flex items-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${errorMessage ? "border border-red-500 dark:border-red-400" : ""}`}
					value={value}
					style={{ 
						height: "30px",
						fontSize: "12px",
					}}
					name={name}
					onChange={onChange}
					options={formattedOptions}
					disabled={disabled}
					onBlur={onBlur}
					placeholder={placeholder}
					emptyMessage={<p className="text-gray-500 dark:text-gray-400">No hay resultados.</p>}
				/>
			</div>

			{/* Mensaje de error fuera del grupo */}
			{errorMessage && <small className="text-red-500 dark:text-red-400 text-xs text-right">{errorMessage}</small>}
		</div>
	);
};