<script setup lang="ts">
import { reactive } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'

// importamos el modelo Task
//import type { Tarea } from '@/models/TaskModel'

// iconos
//import { TrashIcon } from '@heroicons/vue/24/outline'
//import { CheckCircleIcon as CompletedIcon } from '@heroicons/vue/24/solid'

// definir variable para almacenar useThemeStore
// definir variable reactiva pasando objeto themeStore
//const themeStore = useThemeStore()
//const theme = reactive(themeStore)

// definir variable para almacenar useTaskStore
// definir variable reactiva pasando objeto taskStore
const taskStore = useTaskStore()
const tasks = reactive(taskStore)
</script>

<template>
  <div class="w-[90%] sm:w-[30%] h-full flex flex-col items-center bg-white rounded-md overflow-y-auto mt-10 p-4 transition ease-linear">
    <div class="px-6 py-4">
      <div class="font-semibold text-gray-900 text-2xl mb-2">Mis Tareas</div>
    </div>

    <div id="task-cards" v-for="task in tasks.data" :key="task.id" class="flex items-center w-full h-[60px] p-1 rounded-md my-2 bg-gray-200">
      <form v-on:submit.prevent class="flex items-center h-full w-full drop-shadow-lg">
        <div class="">
          <div @click="tasks.cambiarEstado(task)" class="flex flex-col mr-2">
            <input
              v-if="task.completa"
              name="completa"
              type="ckeckbox"
              class="border rounded-full bg-red-500 border-0 focus:ouline-none h-6 w-6 cursor-pointer transition ease-linear"
            />
            <input
              v-if="!task.completa"
              type="ckeckbox"
              class="border rounded-full bg-green-500 border-0 focus:ouline-none h-6 w-6 cursor-pointer transition ease-linear"
            />
          </div>
        </div>

        <input
          disabled
          v-model="task.tarea"
          type="text"
          id="input-task"
          class="rounded-md sm:text-base overflow-ellipsis w-full h-[40px] pl-2 disabled:bg-white focus:outline-none cursor-pointer transition ease-linear"
        />
        <div class="flex ml-2 justify-center items-center">
          <button
            @click="tasks.eliminarTarea(task)"
            class="flex items-center justify-center pb-1 w-[30px] h-[30px] bg-red-500 rounded-full text-white cursor-pointer"
          >
            ⨯
          </button>
        </div>

        <div v-if="task.completa" class="bg-green-200 text-teal-800 text-xs mx-2 px-2 rounded-full uppercase font-semibold">Completo</div>
        <div v-if="!task.completa" class="bg-red-200 text-red-800 text-xs mx-2 px-2 rounded-full uppercase font-semibold">Pendiente</div>
      </form>
    </div>

    <div class="flex justify-center w-full px-6 py-2 mt-5">
      <button
        @click="tasks.getAll"
        class="inline-block bg-[#40b882] rounded-md px-3 py-1 text-white text-sm font-semibold mr-2 mb-2 hover:bg-teal-700 cursor-pointer shadow-lg"
      >
        Todas
      </button>
      <button
        @click="tasks.getCompletas"
        class="inline-block bg-[#40b882] rounded-md px-3 py-1 text-white text-sm font-semibold mr-2 mb-2 hover:bg-teal-700 cursor-pointer shadow-lg"
      >
        Completas
      </button>
      <button
        @click="tasks.getPendientes"
        class="inline-block bg-[#40b882] rounded-md px-3 py-1 text-white text-sm font-semibold mr-2 mb-2 hover:bg-teal-700 cursor-pointer shadow-lg"
      >
        Pendientes
      </button>
    </div>
  </div>
</template>

<style scoped>
#input-task {
  background-color: transparent !important;
}
#task-cards {
  filter: drop-shadow(0px 5px 10px rgb(179, 179, 179));
}
#task-cards:hover {
  transform: scale(1.01);
  filter: drop-shadow(0px 10px 10px rgb(179, 179, 179));
}
</style>
