const serverBaseURL = "";
const testBaseURL = "http://localhost:4455/api";

const urls = [serverBaseURL, testBaseURL];

export const url = urls[0];
// export const url = (import.meta.env?.VITE_API_URL ?? "http://localhost:4455/api").replace(/\/+$/, "");
