<script setup lang="ts">
import ListaTareasComponent from '@/components/ListaTareasComponent.vue'
import TaskUploadComponent from '@/components/TaskUploadComponent.vue'
import { useSesionStore } from '@/stores/AuthSesionStore'
import { useTaskStore } from '@/stores/TaskStore'
import { reactive } from 'vue'
const sesionStore = useSesionStore()
const sesion = reactive(sesionStore)
const taskStore = useTaskStore()
const tareas = reactive(taskStore)
</script>

<template>
  <div class="flex flex-col w-screen h-screen">
    <div class="flex items-center w-full h-[10%] bg-gray-900 shadow-xl">
      <div class="flex w-6/12 pl-4 items-center justify-start">
        <span class="font-semibold text-2xl text-white">Task Manager</span>
      </div>
      <div class="flex items-center justify-end pr-4 w-6/12">
        <button class="bg-[#40b882] text-white rounded-md p-1 w-[110px] h-[40px]" @click="sesion.logout">Cerrar Sesion</button>
      </div>
    </div>
    <div class="flex flex-col w-full justify-center items-center h-[90%] bg-gray-800 overflow-y-scroll">
      <div class="w-full sm:w-[50%] sm:h-[20%] flex justify-center items-center">
        <TaskUploadComponent />
      </div>
      <div class="w-full h-[80%] flex justify-center items-center">
        <ListaTareasComponent />
      </div>
    </div>
  </div>
</template>
