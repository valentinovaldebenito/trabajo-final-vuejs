<script setup lang="ts">
    import { useThemeStore } from '@/stores/ThemeStore';
    import { computed, reactive, ref } from 'vue';
    import LoginComponent from '@/components/auth/LoginComponent.vue';
    import RegisterComponent from '@/components/auth/RegisterComponent.vue';
    import loginImage1 from '@/assets/img/login-register-1.png';
    import loginImage2 from '@/assets/img/login-register-2.png';

    const themeStore = useThemeStore();
    const isDark = computed(() => themeStore.isDark);
    const toggleTheme = themeStore.toggleTheme;

    const useTheme = useThemeStore();
    const theme = reactive(useTheme);

    const showLogin = ref(true);

    function toggleAuthComponent() {
        showLogin.value = !showLogin.value;
    }
</script>

<template>
  <div class="flex h-screen">
        <!-- Columna izquierda con ilustración -->
        <div class="hidden lg:flex flex-1 items-center justify-center w-11/12">
            <img
                :src="isDark ? loginImage2 : loginImage1"
                alt="Illustration"
                class="w-full h-full object-cover"
            />
        </div>
        <!-- Columna derecha con formulario -->
        <div class="flex flex-col justify-center flex-1 py-12 bg-white w-1/5">
          <component :is="showLogin ? LoginComponent : RegisterComponent"/>
          <div class="px-48 mt-6">
            <button type="button" @click="toggleTheme" class="flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out duration-300">
              Cambiar Tema
            </button>
            <a href="#" @click.prevent="toggleAuthComponent" class="mt-4 text-center text-blue-500 hover:underline">
              {{ showLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión' }}
            </a>
          </div>
        </div>
  </div>
</template>