import { MainHeader } from "@/components/MainHeader/MainHeader";
import React from "react";
import { Outlet } from "react-router";

export const MainLayout: React.FC = () => {

	return (
		<div className="flex flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
			
			{/* Contenido principal */}
			<main 
				className={`flex-1 min-h-screen overflow-y-auto  bg-gray-50 dark:bg-gray-900 
				}`}
			>
				<MainHeader
        // textModule="Gestión de Eventos"
        icon={
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        }
        pageTitle="Eventos Perú"
      />
				<Outlet />
			</main>
		</div>
	);
};