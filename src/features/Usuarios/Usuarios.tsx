import axios from "axios";
import { url } from "@/connections/mainApi";

import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useModal } from "@/hooks/useModal";

import { Button } from "primereact/button";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { PrimeModal } from "@/components/PrimeModal/PrimeModal";
import { DataTablePrime } from "@/components/DataTablePrime/DataTablePrime";
import { AddModal } from "./AddModal/AddModal";

export const Usuarios = () => {
	const addModal = useModal();

	const getFetchData = useGetFetch("/user");

	const postFetchData = usePostFetch("/user", {
		sectionName: "Usuario",
		reloadFetchData: getFetchData.reloadFetchData,
		addModal,
		toastMessages: {
			success: "Usuario creado exitosamente",
			error: "Error al crear el Usuario",
		},
	});

	const onDeleteRow = async (rowData: { id: string }) => {
		await axios.delete(`${url}/user/${rowData.id}`);
		getFetchData.reloadFetchData();
	};

	return (
		<>
			<ContentBox>
				<h3>Gestión de Usuarios</h3>
				<Button
					label="Agregar Usuario"
					outlined
					size="small"
					icon="pi pi-plus"
					style={{ margin: "10px 0 20px 0" }}
					onClick={addModal.onVisibleModal}
				/>
				<DataTablePrime columns={columns} data={getFetchData?.data?.data || []} onDelete={onDeleteRow} />
			</ContentBox>
			{/* Add Modal */}
			<PrimeModal
				header="Agregar Usuario"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
				width={500}
			>
				<AddModal
					postFetchData={postFetchData.postFetchData}
					onHideModal={addModal.onHideModal}
				/>
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "ID", campo: "id" },
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "Apellido Paterno", campo: "firstLastname" },
	{ nombre: "Apellido Materno", campo: "secondLastname" },
	{ nombre: "Correo", campo: "email" },
	{
		nombre: "Rol",
		body: (rowData: { role: { name: string } }) => {
			return <p>{rowData.role?.name}</p>;
		},
	},
	{
		nombre: "Estado",
		body: (rowData: { isActive: boolean }) => {
			return <p>{rowData.isActive == true ? "Activo" : "Inactivo"}</p>;
		},
	},
];
