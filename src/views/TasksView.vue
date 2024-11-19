<script setup lang="ts">
  import { useSesionStore } from '@/stores/AuthSesionStore';
import { reactive } from 'vue';
  const sesionStore = useSesionStore();
  const sesion = reactive(sesionStore);
</script>

<template>
    <button @click="sesion.logout">
      Cerrar Sesion
    </button>
</template>
