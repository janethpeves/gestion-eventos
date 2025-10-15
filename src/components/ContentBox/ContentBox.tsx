interface Props {
	children: React.ReactNode;
}

export const ContentBox = ({ children }: Props) => {
	return (
		<div className="min-w-[50px] min-h-[50px] bg-white dark:bg-gray-800 w-full box-border p-3 my-3 shadow-[0px_10px_40px_rgba(41,50,65,0.06)] dark:shadow-[0px_10px_40px_rgba(0,0,0,0.3)] rounded-2xl">
			{children}
		</div>
	);
};