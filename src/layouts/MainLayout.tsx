import { MainHeader } from "@/components/MainHeader/MainHeader";
import React from "react";
import { Outlet } from "react-router";
import { appRoutes } from "@/routes/routeConfig";
import { useAppSelector } from "@/store/hooks";

export const MainLayout: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);


	return (
		<div className="flex flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
			
			{/* Contenido principal */}
			<main 
				className={`flex-1 min-h-screen overflow-y-auto  bg-gray-50 dark:bg-gray-900 
				}`}
			>
				<MainHeader
        menuItems={appRoutes.map((route) => ({
          name: route.label,
          path: route.path || "",
          icon: route.icon,
          roles: route.roles,
        })).filter((route) => route.roles.includes(user?.role || ""))}
      />
				<Outlet />
			</main>
		</div>
	);
};