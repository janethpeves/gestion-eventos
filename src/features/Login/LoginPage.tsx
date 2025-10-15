import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/slices/auth/thunks";

import coverImg from "@/assets/img/fondo.jpg";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { FaUser } from "react-icons/fa";
import logo from "@/assets/img/logo-p.png";

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const [authData, setAuthData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = () => {
		dispatch(loginUser(authData));
	};

	return (
		<div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 p-5 gap-5 bg-gray-50 dark:bg-gray-900">
			<div className="w-full flex flex-col justify-center items-center px-0 lg:px-24 gap-8">
				<div className="flex justify-center items-center">
					<img src={logo} alt="logo de eventos" className="w-48 h-auto" />
				</div>

				<div className="text-center">
					<div className="text-gray-600 dark:text-gray-200 text-sm lg:text-xl font-semibold">
						Sistema de Gestión de Eventos
					</div>
				</div>

				<div className="w-full flex flex-col gap-5 text-gray-700 dark:text-gray-200 font-semibold">
					<TextBoxField
						textLabel="Email:"
						name="email"
						type="email"
						placeholder="correo@dominio.com"
						// value={""}
						value={authData.email}
						onChange={(e) => handleChangeInput(e, setAuthData)}
					/>
					<TextBoxField
						textLabel="Password:"
						name="password"
						type="password"
						placeholder="password"
						// value={""}
						value={authData.password}
						onChange={(e) => handleChangeInput(e, setAuthData)}
					/>
					<CustomButton
						text="Iniciar sesión"
						icon={<FaUser />}
						backgroundButton="var(--primary-color-light)"
						// onClick={() => navigate("/eventos")}
						onClick={handleSubmit}
					/>

				</div>
			</div>

			<div className="w-full h-full hidden lg:flex justify-center items-center bg-[var(--primary-color-light)] dark:bg-gray-800 text-white rounded-2xl overflow-hidden">
				<img
					className="w-full h-full object-cover"
					src={coverImg}
					alt="cover de sistema de gestión"
				/>
			</div>
		</div>
	);
};
