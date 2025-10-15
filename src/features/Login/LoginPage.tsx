import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/slices/auth/thunks";

import coverImg from "@/assets/img/cover-login-1.jpg";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { FaUser } from "react-icons/fa";

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
					<div className="bg-white p-2 rounded-lg">
						<svg
							className="w-10 h-10 text-blue-500"
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
					</div>
					<h2 className="text-lg font-bold text-blue-500 dark:text-white">
						Eventos Perú
					</h2>
				</div>

				<div className="text-center">
					<div className="text-gray-600 dark:text-gray-200 text-2sm lg:text-3xl font-semibold">
						Sistema de Gestión de Eventos
					</div>
					{/* <p className="text-xl font-semibold">Inicia sesión con tus credenciales</p> */}
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
            backgroundButton="#537FFF"
						// onClick={() => navigate("/eventos")}
						onClick={handleSubmit}
					/>

					{/* <Button
            label="Iniciar sesión"
            icon="pi pi-user"
            className="w-full mt-2 !bg-[var(--primary-color-light)] !border-[var(--primary-color-light)] !hover:bg-[var(--primary-color-light)] !hover:border-[var(--primary-color-light)]"
            onClick={handleSubmit}
          /> */}
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
