import { useNavigate } from "react-router";

import { Button } from "primereact/button";

import doctor from "@/assets/img/doctor2.png";
import logo from "@/assets/img/logo.png";

export const Error404 = () => {
  const navigate = useNavigate();
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] items-center justify-center justify-items-center h-screen p-8 gap-5">
			<div className="flex flex-col items-center justify-center gap-5">
				<div className="w-25 h-25">
					<img src={logo} alt="Logo" />
				</div>
				<div className="flex flex-col gap-2.5">
					<h1 className="text-4xl font-bold text-[var(--text-color)] text-center">¡Ups! Algo salió mal.</h1>
					<p className="text-base font-normal text-center">Lo sentimos, no pudimos encontrar esta página.</p>
					<p className="text-base font-normal text-center">La página que intentas acceder no se encuentra disponible</p>
					<p className="text-base font-normal text-center">Volver a la página de inicio</p>
					<Button label="Volver a la página de inicio" 
          className="w-full mt-5 bg-[#028881] border border-[#028881]"
          onClick={() => navigate("/dashboard")}/>
				</div>
			</div>
			<div className="w-[500px] h-[500px]">
				<img src={doctor} alt="Error 404" className="w-full h-full object-cover" />
			</div>
		</div>
	);
};

