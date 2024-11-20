<script setup lang="ts">
    import { useThemeStore } from '@/stores/ThemeStore';
    import { computed, reactive, ref } from 'vue';
    import LoginComponent from '@/components/auth/LoginComponent.vue';
    import RegisterComponent from '@/components/auth/RegisterComponent.vue';
    import loginImage1 from '@/assets/img/login-register-1.png';
    import loginImage2 from '@/assets/img/login-register-2.png';


    const useTheme = useThemeStore();
    const theme = reactive(useTheme);
    const toggleTheme = theme.toggleTheme;
    const showLogin = ref(true);

    function toggleAuthComponent() {
        showLogin.value = !showLogin.value;
    }
</script>

<template>
  <div :class="theme.isDark ? 'bg-gray-900' : 'bg-white'" class="flex h-screen transition-colors duration-500">
        <!-- Columna izquierda con ilustración -->
        <div class="hidden lg:flex flex-1 items-center justify-center w-11/12 relative">
            <img
                :src="loginImage1"
                alt="Illustration Light"
                class="w-full h-full object-cover transition-opacity duration-500 absolute"
                :class="{ 'opacity-0': theme.isDark, 'opacity-100': !theme.isDark }"
            />
            <img
                :src="loginImage2"
                alt="Illustration Dark"
                class="w-full h-full object-cover transition-opacity duration-500 absolute"
                :class="{ 'opacity-100': theme.isDark, 'opacity-0': !theme.isDark }"
            />
        </div>
        <!-- Columna derecha con formulario -->
        <div class="flex flex-col justify-center flex-1 py-12 bg-white w-1/5">
          <component :is="showLogin ? LoginComponent : RegisterComponent"/>
          <div class="px-48 mt-6 flex flex-col items-center">
            <button type="button" @click="toggleTheme" class="flex w-full justify-center rounded-md bg-[#41B883] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#42D293] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out duration-300">
              Cambiar Tema
            </button>
            <a @click.prevent="toggleAuthComponent" class="mt-4 text-center text-blue-500 hover:underline w-auto cursor-pointer">
              {{ showLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión' }}
            </a>
          </div>
        </div>
  </div>
</template>

<style scoped>
.transition-opacity {
  transition: opacity 0.5s ease-in-out;
}
</style>