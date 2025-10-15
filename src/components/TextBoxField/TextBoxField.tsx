import { type ChangeEvent, type FocusEventHandler } from "react";
import { InputText } from "primereact/inputtext";

interface TextBoxFieldProps {
	textLabel?: string;
	value: string | number | undefined;
	name: string;
	type?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	direction?: "row" | "column";
	disabled?: boolean;
	labelWidth?: string;
	onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
	placeholder?: string;
	containerWidth?: string;
	errorMessage?: string;
	maxLength?: number;
	tooltip?: string;
}

export const TextBoxField = ({
	textLabel,
	value,
	name,
	type = "text",
	onChange,
	direction = "column",
	disabled = false,
	labelWidth,
	onBlur,
	containerWidth,
	placeholder,
	errorMessage,
	maxLength,
	tooltip,
}: TextBoxFieldProps) => {
	const styles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "12px",
	};
	const stylesContainer: React.CSSProperties = {
		width: containerWidth,
	};

	return (
		<div className="w-full flex flex-col gap-1" style={stylesContainer}>
			<div
				className={`w-full grid gap-1 ${
					direction === "column" 
						? "grid-cols-1" 
						: "grid-cols-[max-content_1fr] items-center"
				}`}
			>
				{textLabel ? <label className="text-gray-700 dark:text-gray-300" style={styles}>{textLabel}</label> : <></>}

				<InputText
					className={`w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-600 ${errorMessage ? "border border-red-500 dark:border-red-400" : ""}`}
					value={value as string}
					name={name}
					type={type}
					onChange={onChange}
					style={{
						width: "100%",
						height: "30px",
						fontSize: "12px",
					}}
					autoComplete="off"
					disabled={disabled}
					onBlur={onBlur}
					tooltip={tooltip}
					placeholder={placeholder}
					maxLength={maxLength}
				/>
			</div>

			{/* Mensaje de error fuera del grupo */}
			{errorMessage && <small className="text-red-500 dark:text-red-400 text-xs text-right">{errorMessage}</small>}
		</div>
	);
};