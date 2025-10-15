import { useEffect, useRef} from "react";

import logo from "@/assets/img/logo-n.png";

import { Toast } from "primereact/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/store/slices/auth";
import { clearToast } from "@/store/slices/toast";

import { RiLogoutBoxRLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router";

interface MenuItem {
	name: string;
	path: string;
	icon?: React.ReactNode;
	roles: string[];
}

interface Props {
	menuItems?: MenuItem[];
}

export const MainHeader = ({
	menuItems,
}: Props) => {
	const toast: any = useRef(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

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

	const handleMenuClick = (path: string) => {
		navigate(path);
	};

	return (
		<>
			<header className="w-full h-[60px] flex items-center justify-between px-4 lg:px-12 bg-[var(--primary-color-light)] dark:bg-gray-800 sticky top-0 z-[6]">
				<Toast ref={toast} />
				<div className="flex items-center gap-4 lg:gap-[100px]">
					<div className="flex items-center">
						<img src={logo} alt="logo de eventos" className="w-25 h-auto" />
					</div>
				</div>

				{/* Menú de navegación */}
				{menuItems && menuItems.length > 0 && (
					<nav className="hidden lg:flex items-center gap-6">
						{menuItems.map((item, index) => (
							<button
								key={index}
								onClick={() => handleMenuClick(item.path)}
								className={`text-white hover:text-gray-200 font-semibold text-sm transition-colors duration-200 px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer ${
									location.pathname === item.path 
										? 'bg-white/20 border-b-2 border-white' 
										: 'hover:bg-white/10'
								}`}
							>
								{item.icon}
								{item.name}
							</button>
						))}
					</nav>
				)}

				<div className="flex items-center gap-5 lg:gap-5">
					<div className="hidden sm:block">
							<p className="text-white font-bold text-sm">janeth@gmail.com</p>
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