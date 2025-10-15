import React, { type ChangeEvent, type FocusEvent } from "react";
import { InputTextarea } from "primereact/inputtextarea";

interface TextAreaFieldProps {
	textLabel?: string;
	value: string | undefined;
	name: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	direction?: "row" | "column";
	disabled?: boolean;
	labelWidth?: string;
	onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
	containerStyle?: React.CSSProperties;
	labelWrap?: string;
	maxLength?: number | undefined;
	minLength?: number | undefined;
	toUpperCase?: boolean;
	containerWidth?: string;
	placeholder?: string;
	rows?: number;
	cols?: number;
	autoResize?: boolean;
}

export const TextAreaField = ({
	textLabel,
	value,
	name,
	onChange,
	direction = "column",
	disabled = false,
	labelWidth = "100%",
	onBlur,
	labelWrap,
	maxLength,
	minLength = 0,
	toUpperCase = true,
	containerWidth = "100%",
	placeholder = "",
	rows = 3,
	cols,
	autoResize = true,
}: TextAreaFieldProps) => {
	const labelStyles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "16px",
		whiteSpace: labelWrap,
	};

	const containerStyles: React.CSSProperties = {
		width: containerWidth,
	};

	const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = e.target.value;

		if (maxLength && inputValue.length > maxLength) {
			e.target.value = inputValue.slice(0, maxLength);
		}
		onChange(e);
	};

	return (
		<div
			className={`w-full grid gap-1 ${
				direction === "column" 
					? "grid-cols-1" 
					: "grid-cols-[max-content_1fr] items-center"
			}`}
			style={containerStyles}
		>
			{textLabel && (
				<label 
					className="text-xs text-gray-700 dark:text-gray-300"
					style={labelStyles}
				>
					{textLabel}
				</label>
			)}

			<InputTextarea
				className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
				value={value}
				name={name}
				onChange={handleTextAreaChange}
				autoComplete="off"
				disabled={disabled}
				onBlur={onBlur}
				style={{
					textTransform: `${toUpperCase ? "uppercase" : "none"}`,
				}}
				maxLength={maxLength}
				minLength={minLength}
				placeholder={placeholder}
				rows={rows}
				cols={cols}
				autoResize={autoResize}
			/>
		</div>
	);
};