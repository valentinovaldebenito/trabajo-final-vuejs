import { defineStore } from "pinia";
import router from "@/router";
import type { SesionStateModel } from "@/models/SesionStateModel";
import type { CredentialsModel } from "@/models/CredentialsModel";
import { API } from "@/services";
import { apiInstance } from "@/services/api";


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
        changeCrsfToken() {
            const headers = apiInstance.defaults.headers 
            this.data!.crsfToken = headers["csrf-token"]?.toString() 
            console.info('[SesionStore] CRSF Token Actualizado') 
        },

        async registerUser(userData: CredentialsModel) {
            this.loading = true; 
            try {
                const response = await API.CreateUser(userData) 

                if(response.status === 201) {
                    this.data!.user = userData 
                    console.info('[Sesion Store] Usuario Creado, codigo de respuesta: ' + response.status)
                    this.login(userData) 
                    this.loading = false 
                }
            } catch (e) {
                console.error('[Sesion Store] Error al registrar usuario', e)
                this.error = e!.toString()
            }
        },

        async login(userData: CredentialsModel) {
            this.loading = true; 
            try {
                const response = await API.Login(userData)
                if(response.status === 200) {
                    this.data!.user = userData 
                    const currentEpochTime = Math.floor(Date.now() / 1000) 
                    this.data!.jwtExpires = currentEpochTime + 3 * 60 
                    console.info('[Sesion Store] Usuario Logeado, codigo de respuesta: '+response.status)
                    console.info('[Sesion Store] Ruteando a Tareas')
                    this.loading = false
                    router.push('/tasks')
                }
            } catch (e) {
                console.error('[Sesion Store] Error al loggear al usuario', e)
                this.error = e!.toString()
            }
        }
    }
})