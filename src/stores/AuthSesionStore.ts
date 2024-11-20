import { defineStore } from "pinia";
import router from "@/router";
import type { SesionStateModel } from "@/models/SesionStateModel";
import type { CredentialsModel } from "@/models/CredentialsModel";
import { API } from "@/services";
import { apiInstance } from "@/services/api";
import { AxiosError } from 'axios';

export const useSesionStore = defineStore({
    id: "sesion",
    state: (): SesionStateModel => ({
        loading: false,
        data: {
            user: undefined,
            crsfToken: undefined,
            jwtExpires: undefined
        },
        error: ''
    }),
    actions: {
        async changeCrsfToken() {
            const headers = apiInstance.defaults.headers;
            this.data!.crsfToken = headers["csrf-token"]?.toString();
        },

        async registerUser(userData: CredentialsModel) {
            this.loading = true;
            try {
                const response = await API.CreateUser(userData);

                if (response.status === 201) {
                    this.data!.user = userData;
                    this.error = '';
                    await this.login(userData);
                    this.loading = false;
                }
            } catch (e) {
                this.loading = false;
                const error = e as AxiosError;
                if (error.response) {
                    const data = error.response.data as { message?: string | string[] };
                    const errorMessage = data.message;
                    if (Array.isArray(errorMessage)) {
                        this.error = errorMessage.join(', ');
                    } else {
                        this.error = errorMessage || 'Error desconocido';
                    }
                } else {
                    this.error = 'Error de conexión';
                }
            }
        },

        async login(userData: CredentialsModel) {
            this.loading = true;
            try {
                const response = await API.Login(userData);
                if (response.status === 200) {
                    this.data!.user = userData;
                    const currentEpochTime = Math.floor(Date.now() / 1000);
                    this.data!.jwtExpires = currentEpochTime + 3 * 60;
                    this.renewToken();
                    this.loading = false;
                    this.error = '';
                    router.push('/tasks');
                }
            } catch (e) {
                this.loading = false;
                const error = e as AxiosError;
                if (error.response) {
                    const data = error.response.data as { message?: string | string[] };
                    const errorMessage = data.message;
                    if (Array.isArray(errorMessage)) {
                        this.error = errorMessage.join(', ');
                    } else {
                        this.error = errorMessage || 'Error desconocido';
                    }
                } else {
                    this.error = 'Error de conexión';
                }
            }
        },

        renewToken() {
            setTimeout(async () => {
                try {
                    const response = await API.Login({email: this.data!.user!.email, password: this.data!.user!.password});
                    if(response.status === 200) {
                        const currentEpochTime = Math.floor(Date.now() / 1000);
                        this.data!.jwtExpires = currentEpochTime + 3 * 60;
                    }
                } catch (e) {
                    this.error = e!.toString();
                }
            }, 3 * 60 * 1000);

            setTimeout(() => this.renewToken(), 3 * 60 * 1000);
        },

        async logout() {
            this.loading = true;
            this.data!.user = undefined;
            this.data!.jwtExpires = undefined;
            try {
                const response = await API.Logout();
                if(response.status === 200) {
                    document.cookie = "csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    this.loading = false;
                    router.push('/');
                }
            } catch (e) {
                this.loading = false;
                this.error = e!.toString();
            }
        }
    }
});