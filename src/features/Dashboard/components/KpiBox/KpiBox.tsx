import { type ReactNode } from "react";
import style from "./KpiBox.module.css";

interface KpiBoxProps {
	title: string;
	value: string | number;
	icon: ReactNode;
	bgColor?: string;
	textColor?: string;
}

export const KpiBox = ({ title, value, icon, bgColor, textColor }: KpiBoxProps) => {
	return (
		<div
			className={style.kpi__item}
			style={{
				backgroundColor: bgColor || "var(--surface-card)",
				color: textColor || "inherit",
			}}
		>
			<div>
				<p className={style.kpi__title}>{title}</p>
				<p className={style.kpi__subtitle}>{value}</p>
			</div>

			<div className={style.kpi__icon}>{icon}</div>
		</div>
	);
};
