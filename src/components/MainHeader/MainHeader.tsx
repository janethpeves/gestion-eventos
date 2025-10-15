import { useEffect, useRef} from "react";

import { Toast } from "primereact/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/store/slices/auth";
import { clearToast } from "@/store/slices/toast";

import { RiLogoutBoxRLine } from "react-icons/ri";

interface Props {
	textModule?: string;
	icon?: React.ReactNode;
	pageTitle?: string;
}

export const MainHeader = ({
	textModule,
	icon,      
	pageTitle,
}: Props) => {
	const toast: any = useRef(null);
	const dispatch = useAppDispatch();

	const { toastConfig } = useAppSelector((state) => state.toast);

	useEffect(() => {
		if (toastConfig.severity) {
			toast.current?.show({
				severity: toastConfig.severity,
				summary: toastConfig.summary,
				detail: toastConfig.detail,
			});

			dispatch(clearToast());
		}
	}, [toastConfig]);

	const handleButtonClick = () => {
		dispatch(logoutUser());
		// if (isMobile) {
		// 	setIsSidebarOpen(!isSidebarOpen);
		// 	onMenuClick?.();
		// } else {
		// 	dispatch(logoutUser());
		// }
	};


	return (
		<>
			<header className="w-full h-[60px] flex items-center justify-between px-4 lg:px-12 bg-[var(--primary-color-light)] dark:bg-gray-800 sticky top-0 z-[6]">
				<Toast ref={toast} />
				<div className="flex items-center gap-4 lg:gap-[100px]">
					<div className="flex gap-2.5 items-center">

						{/* Título de página con ícono - Nueva sección */}
						{ icon && pageTitle && (
							<div className="flex items-center gap-3">
								<div className="bg-white p-2 rounded-lg">
									{icon}
								</div>
								<h2 className="text-sm font-bold text-white dark:text-white">
									{pageTitle}
								</h2>
							</div>
						)}
					</div>
				</div>

				<div className="hidden lg:flex flex-col items-center text-white dark:text-gray-200 font-semibold">
					<p className="text-sm">
						{textModule}
					</p>
				</div>

				<div className="flex items-center gap-5 lg:gap-5">
					<div className="hidden sm:block">
							<p className="text-white font-bold text-sm">juan@gmail.com</p>
							<p className="text-white text-sm">ADMIN</p>
						</div>
					<div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center">
						<p className="text-[var(--primary-color-light)] dark:text-gray-300 text-lg font-medium">J</p>
					</div>

					{/* Botón hamburguesa en móvil */}
					
						<div
							className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center cursor-pointer logout_button"
							onClick={handleButtonClick}
						>
							<RiLogoutBoxRLine fill="var(--primary-color-light)" size={20} />
						</div>
					
				</div>
			</header>
		</>
	);
};