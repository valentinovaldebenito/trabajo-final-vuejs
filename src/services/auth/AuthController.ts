import { apiInstance } from "../api";
import type { APIResponse } from "@/models/ApiResponseModel";
import type { CredentialsModel } from "@/models/CredentialsModel";
import type { AuthApiResponseModel } from "@/models/AuthApiResponseModel";


export async function CreateUser(userData: CredentialsModel) {
    return await apiInstance.post<APIResponse<AuthApiResponseModel>>("auth/signup", userData)
}

export async function Login(credentials: CredentialsModel) {
    const response = await apiInstance.post<APIResponse<AuthApiResponseModel>>(
        "/auth/login", 
        credentials,
        {
            withCredentials: true 
        }
        ); 
        const setCookieHeader = response.headers['set-cookie'];
    return response 
}

export async function Logout() {
    return await apiInstance.post<APIResponse<null>>("/auth/logout");
}