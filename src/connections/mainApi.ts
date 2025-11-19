const serverBaseURL = "";
const testBaseURL = "http://31.220.74.216:3000";

const urls = [serverBaseURL, testBaseURL];

export const url = urls[1];
// export const url = (import.meta.env?.VITE_API_URL ?? "http://localhost:4455/api").replace(/\/+$/, "");
