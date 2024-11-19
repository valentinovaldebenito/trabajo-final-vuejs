<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import { useThemeStore } from '@/stores/ThemeStore'
    import { useSesionStore } from '@/stores/AuthSesionStore'
    import type { CredentialsModel } from '@/models/CredentialsModel'

    const useTheme = useThemeStore() 
    const theme = reactive(useTheme)

    const useSesion = useSesionStore()
    const sesion = reactive(useSesion)

    const newCredentials: CredentialsModel = {
        email: '',
        password: ''
    }

    const repeatPwd: string = ''
    const rptPwd = ref(repeatPwd)

    const credentials = reactive(newCredentials)

    async function logCredentials() {
        if(rptPwd.value === newCredentials.password) {
            await sesion.registerUser(newCredentials)
        }
        else {
            console.error('Las Contrasenas No coinciden')
        }
    }
</script>
<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-14 w-auto" src="https://seeklogo.com/images/V/vuejs-logo-17D586B587-seeklogo.com.png" alt="Your Company" />
        <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">Registrate</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="logCredentials()">
            <div>
                <label for="email" class="block text-sm leading-6 font-medium text-gray-900">Correo Electronico</label>
                <div class="mt-2">
                    <input id="email" name="email" type="email" autocomplete="email" v-model="credentials.email" required placeholder="email@company.com"
                    class="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-[#41B883] sm:text-sm transition ease-in-out duration-400">
                </div>
            </div>
            <div>
                <label for="password" class="block text-sm leading-6 font-medium text-gray-900">Contraseña</label>
                <div class="mt-2">
                    <input id="password" name="password" type="password" required autocomplete="current-password" v-model="credentials.password" placeholder="••••••••" 
                    class="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-[#41B883] sm:text-sm transition ease-in-out duration-400" />
                </div>
            </div>
            <div>
                <label for="confirm-password" class="block text-sm leading-6 font-medium text-gray-900">Repite Contraseña</label>
                <div class="mt-2">
                    <input id="confirm-password" name="confirm-password" type="password" required autocomplete="current-password" v-model="rptPwd" placeholder="••••••••" 
                    class="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-[#41B883] sm:text-sm transition ease-in-out duration-400" />
                </div>
            </div>
            <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-[#41B883] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#42D293] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out duration-300">
                    Registrar
                </button>
            </div>
        </form>
    </div>
</template>