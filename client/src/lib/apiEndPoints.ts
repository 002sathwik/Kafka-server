import Env from "./env";

export const BASEURL = Env.BACKEND_URL;
export const API_URL = BASEURL + "/api/v1";
export const LOGIN_URL = API_URL + "/auth/login";