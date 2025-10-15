export function getDateFromISO(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTimeFromISO(isoString: string): string {
  const date = new Date(isoString);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export const extractTime = (
  dateTimeString: string,
  includeSeconds: boolean = false
): string => {
  const formattedDateTimeString = dateTimeString.includes("T")
    ? dateTimeString.replace("T", " ")
    : dateTimeString;

  const [, time] = formattedDateTimeString.split(" ");
  return time ? (includeSeconds ? time.slice(0, 8) : time.slice(0, 5)) : "";
};

export const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) {
    // console.error(
    //   "El valor proporcionado a formatDate es inválido:",
    //   dateString
    // );
    return "";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    // console.error("La fecha proporcionada no es válida:", dateString);
    return "";
  }

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};


export const formatDateComplete = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');   // Añade un 0 si el día es menor a 10
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0, por eso se le suma 1
  const year = date.getFullYear(); // Año con 4 dígitos
  
  return `${day}/${month}/${year}`;
};
