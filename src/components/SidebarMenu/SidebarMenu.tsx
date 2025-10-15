import React from "react";
import { useLocation, useNavigate } from "react-router";

import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/auth/thunks";

import { FaSignOutAlt } from "react-icons/fa";

import logo from "@/assets/img/logo.png";

import { appRoutes } from "../../routes/routeConfig";
import { currentUser } from "@/utils/currentUser";
// import { appRoutesCitas } from "@/routes/routeAppCitas";
// import { appRoutesCartas } from "@/routes/routeCartas";

interface SidebarMenuProps {
	onClose?: () => void;
	showCloseButton?: boolean;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ onClose, showCloseButton = false }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	// const { user } = useAppSelector((state) => state.auth);
	const user = currentUser;

	const handleNavigate = (path: string) => {
		navigate(path);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	const filteredMenuItems = appRoutes.filter((route) => route.roles.includes(user?.role || ""));
	// const filteredMenuItemsCitas = appRoutesCitas.filter((route) =>
	// 	route.roles.includes(user?.role || "")
	// );
	// const filteredMenuItemsCartas = appRoutesCartas.filter((route) =>
	// 	route.roles.includes(user?.role || "")
	// );

	return (
		<div className="w-[300px] h-screen p-6 fixed top-0 left-0 overflow-y-auto grid grid-rows-[auto_auto_auto_auto_auto_auto_1fr] gap-5 bg-[#f9fbfc] border-r border-[rgba(155,155,155,0.2)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-thumb]:bg-[#888] [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb:hover]:bg-[#555] z-[9]">
			{/* Botón cerrar - solo en móvil */}
			{showCloseButton && onClose && (
				<div className="absolute top-4 right-4 z-[10]">
					<button
						onClick={onClose}
						className="w-8 h-8 rounded-full !bg-[#028881] flex items-center justify-center cursor-pointer text-white shadow-lg"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			)}

			<img className="w-25" src={logo} alt="logo de k-salud" />

			<h2 className="!text-lg text-[#333]">Gestión de Licencias</h2>

			<div className="flex flex-col gap-3">
				{filteredMenuItems.map((item) => {
					return (
						<div
							key={item.path}
							className={`flex items-center gap-3 p-2.5 rounded-lg text-[#333] cursor-pointer transition-colors hover:bg-[#e9eef3] ${
								location.pathname === item.path ? "bg-[#e9eef3]" : ""
							}`}
							onClick={() => handleNavigate(item.path)}
						>
							<div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
							<span className="text-sm">{item.label}</span>
						</div>
					);
				})}
			</div>
			{/* <h2 className="!text-lg text-[#333]">Gestión de App de Citas</h2>
			<div className="flex flex-col gap-3">
				{filteredMenuItemsCitas.map((item) => {
					return (
						<div
							key={item.path}
							className={`flex items-center gap-3 p-2.5 rounded-lg text-[#333] cursor-pointer transition-colors hover:bg-[#e9eef3] ${
								location.pathname === item.path ? "bg-[#e9eef3]" : ""
							}`}
							onClick={() => handleNavigate(item.path)}
						>
							<div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
							<span className="text-sm">{item.label}</span>
						</div>
					);
				})}
			</div>
			<h2 className="!text-lg text-[#333]">Gestión de Documentos</h2>
			<div className="flex flex-col gap-3">
				{filteredMenuItemsCartas.map((item) => {
					return (
						<div
							key={item.path}
							className={`flex items-center gap-3 p-2.5 rounded-lg text-[#333] cursor-pointer transition-colors hover:bg-[#e9eef3] ${
								location.pathname === item.path ? "bg-[#e9eef3]" : ""
							}`}
							onClick={() => handleNavigate(item.path)}
						>
							<div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
							<span className="text-sm">{item.label}</span>
						</div>
					);
				})}
			</div> */}

			<div className="flex flex-col gap-4">
				{/* {user?.role === "ADMIN" && (
          <div>
            <button
              className="w-full p-2.5 flex items-center justify-center text-sm text-white bg-[#606162] border-none rounded-lg cursor-pointer"
              onClick={() => navigate("/configuracion-cas")}
            >
              <MdLocalHospital className="mr-2" />
              Configuración CAS
            </button>
          </div>
        )} */}
				<div>
					<button
						className="w-full p-2.5 flex items-center justify-center text-xs text-white !bg-[#028881] border-none rounded-lg cursor-pointer"
						onClick={handleLogout}
					>
						<FaSignOutAlt className="mr-2" />
						Cerrar sesión
					</button>
				</div>
			</div>
		</div>
	);
};
