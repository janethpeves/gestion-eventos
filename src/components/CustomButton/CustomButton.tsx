import React, { type ReactNode } from "react";

interface CustomButtonProps {
	icon?: string | ReactNode;
	text: string;
	shortcut?: string;
	backgroundButton?: string;
	height?: string;
	colorP?: string;
	sizeP?: string;
	onClick?: () => void;
	additionalClassName?: string;
	type?: any;
	width?: string;
	title?: string;
	iconWidth?: number;
}

export const CustomButton = ({
	icon,
	text,
	shortcut,
	title,
	backgroundButton = "var(--primary-color-light)",
	height = "auto",
	colorP = "#fff",
	sizeP,
	additionalClassName,
	onClick,
	type,
	width,
	iconWidth,
}: CustomButtonProps) => {
	const styles: React.CSSProperties = {
		background: backgroundButton,
		height: height,
		color: colorP,
		width: width,
	};
	const stylesP: React.CSSProperties = {
		color: colorP,
		fontSize: sizeP,
		// textTransform: "uppercase",
		fontWeight: "500",
		// gap: "10px",
	};

	const combinedClassNames = `px-5 py-3 flex gap-1 justify-center items-center cursor-pointer rounded-md bg-white dark:bg-gray-700 border-none outline-none hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 ${additionalClassName || ""}`;

	return (
		<button
			className={combinedClassNames}
			style={styles}
			onClick={onClick}
			type={type}
			title={title}
		>
			{typeof icon === "string" && <img src={icon} alt="icono" width={iconWidth} />}
			{typeof icon === "object" && icon}
			{text !== "" && (
				<p className="font-semibold text-xs dark:text-gray-200" style={stylesP}>
					{text} {shortcut ? `[${shortcut}]` : null}
				</p>
			)}
		</button>
	);
};