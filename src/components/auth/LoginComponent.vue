<script setup lang="ts">
    import { computed } from 'vue';
    import { useSesionStore } from '@/stores/AuthSesionStore';
    import type { CredentialsModel } from '@/models/CredentialsModel.ts';	


    const sesion = useSesionStore()

    const credentials: CredentialsModel = {
        email: '',
        password: ''
    }

    const errorMessage = computed(() => sesion.error)
    

    sesion.changeCrsfToken()

    async function loginWithCredentials() {
        await sesion.login(credentials);
    }
</script>
<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-14 w-auto" src="https://seeklogo.com/images/V/vuejs-logo-17D586B587-seeklogo.com.png" alt="Your Company" />
        <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">Iniciar Sesion</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="loginWithCredentials()">
            <div>
                <label for="email" class="block text-sm leading-6 font-medium text-gray-900">Correo Electronico</label>
                <div class="mt-2">
                    <input id="email" name="email" type="email" autocomplete="email" v-model="credentials.email" required placeholder="email@company.com"
                    :class="['block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm ring-1 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm transition ease-in-out duration-400', errorMessage ? 'border-red-500 ring-red-500' : 'ring-gray-300 focus:ring-[#41B883]']">
                </div>
            </div>
            <div>
                <label for="password" class="block text-sm leading-6 font-medium text-gray-900">Contraseña</label>
                <div class="mt-2">
                    <input id="password" name="password" type="password" required autocomplete="current-password" v-model="credentials.password" placeholder="••••••••" 
                    :class="['block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm ring-1 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm transition ease-in-out duration-400', errorMessage ? 'border-red-500 ring-red-500' : 'ring-gray-300 focus:ring-[#41B883]']" />
                </div>
            </div>
            <div v-if="errorMessage" class="text-red-500 text-sm">
                {{ errorMessage }}
            </div>
            <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-[#41B883] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#42D293] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out duration-300">
                    Iniciar Sesion
                </button>
            </div>
        </form>
    </div>
</template>