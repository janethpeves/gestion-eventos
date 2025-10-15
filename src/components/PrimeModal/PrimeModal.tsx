import { Dialog } from 'primereact/dialog';

interface PrimeModalProps {
	modalStatus: boolean;
	onHideModal: () => void;
	children: React.ReactNode;
	header: string;
	width?: number | string;
}

export const PrimeModal: React.FC<PrimeModalProps> = ({ modalStatus, onHideModal, children, header, width = 600 }) => {
	return (
		<Dialog
			header={header}
			visible={modalStatus}
			modal
			draggable={false}
			style={{ width: `${width}px` }}
			onHide={onHideModal}
			dismissableMask={true}
			className="dark:bg-gray-800 dark:text-gray-200"
			contentClassName="dark:bg-gray-800 dark:text-gray-200"
			headerClassName="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
		>
			{children}
		</Dialog>
	);
};