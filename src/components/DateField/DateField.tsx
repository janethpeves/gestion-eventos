import React from "react";

import { Calendar } from "primereact/calendar";

interface Props {
	textLabel?: string;
	type?: "normal" | "mes" | "year";
	direction?: "row" | "column";
	labelWidth?: string;
	containerWidth?: string;
	value?: any;
	name?: any;
	onChange?: any;
	dateFormat?: any;
}

export const DateField = ({
	textLabel,
	type = "normal",
	direction = "column",
	labelWidth = "100%",
	containerWidth = "100%",
	value,
	name,
	onChange,
	dateFormat = "dd/mm/yy",
}: Props) => {
	const styles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "16px",
		marginBottom: "4px",
	};
	const stylesContainer: React.CSSProperties = {
		width: containerWidth,
	};

	const calendarStyles: React.CSSProperties = {
		height: "32px",
		fontSize: "13px",
		borderRadius: "4px",
	};

	return (
		<div
			className={`${
				direction === "column" ? "flex flex-col" : "flex flex-row items-center gap-2"
			}`}
			style={stylesContainer}
		>
			<label className="text-gray-700 dark:text-gray-300" style={styles}>{textLabel}</label>

			{type === "normal" && (
				<Calendar
					className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
					style={calendarStyles}
					value={value}
					name={name}
					dateFormat={dateFormat}
					onChange={onChange}
					showIcon
					placeholder="Seleccionar fecha"
				/>
			)}
			{type === "mes" && (
				<Calendar
					className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
					style={calendarStyles}
					value={value}
					name={name}
					onChange={onChange}
					view="month"
					dateFormat="mm/yy"
					showIcon
					placeholder="Seleccionar mes"
				/>
			)}
      {type === "year" && (
				<Calendar
					className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
					style={calendarStyles}
					value={value}
					name={name}
					onChange={onChange}
					view="year"
					dateFormat="yy"
					showIcon
					placeholder="Seleccionar año"
				/>
			)}
		</div>
	);
};