import {  Dispatch, SetStateAction } from "react";

type SetFunction<T> = Dispatch<SetStateAction<T>>;

// const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
// 	setNewBank((prev) => ({
// 		...prev,
// 		[e.target.name]: e.target.value,
// 	}));
// };

export const handleChangeInput = <T>(
	e: React.ChangeEvent<HTMLInputElement>,
	setFunction: SetFunction<T>,
) => {
	setFunction((prev: T) => ({
		...prev,
		[e.target.name]: e.target.value,
	}));
};
