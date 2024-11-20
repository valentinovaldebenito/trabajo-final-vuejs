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
  <div
    class="w-[30%] h-full flex flex-col items-center bg-red-400 rounded-md overflow-y-auto shadow-lg mt-10 p-4 transition ease-linear"
  >
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">Mis Tareas</div>
    </div>

    <div
      v-for="task in tasks.data"
      :key="task.id"
      class="w-full relative group border-black my-2 transition ease-linear bg-green-300"
    >
      <form v-on:submit.prevent class="flex h-full w-full">
        <div class="">
          <div @click="tasks.cambiarEstado(task)" class="relative">
            <input
              type="ckeckbox"
              class="border rounded-full focus:ouline-none h-6 w-6 cursor-pointer transition ease-linear"
            />
            <!-- usar directiva v-if para mostrar si la tarjeta esta completada -->
            <!-- <CompletedIcon v-if="task.completa" class="h-100 w-100 absolute text-green-600" /> -->
          </div>
        </div>

        <!-- usar v-model para pasar el texto de la tarea en input -->
        <input
          disabled
          v-model="task.tarea"
          type="text"
          class="rounded-md sm:text-base overflow-ellipsis w-full disabled:bg-white focus:outline-none cursor-pointer transition ease-linear"
        />
        <div class="flex justify-around cursor-default">
          <button @click="tasks.eliminarTarea(task)" class="p-1 cursor-pointer">
            <!-- <TrashIcon class="w-6 h-6 hover:text-red-500" /> -->Eliminar
          </button>
        </div>

        <!-- indicador de tarea terminada, usar v-if segun corresponda -->
        <span
          v-if="task.completa"
          class="bg-green-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold"
          >Completo</span
        >
        <span
          v-if="!task.completa"
          class="bg-red-200 text-red-800 text-xs px-2 rounded-full uppercase font-semibold"
          >Pendiente</span
        >
      </form>
    </div>

    <!-- aca acciones de filtrado, usar @click segun corresponda -->
    <div class="px-6 py-2 mt-5">
      <span
        @click="tasks.getAll"
        class="inline-block bg-gray-300 rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-500 cursor-pointer shadow-lg"
        >Todas</span
      >
      <span
        @click="tasks.getCompletas"
        class="inline-block bg-gray-300 rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-500 cursor-pointer shadow-lg"
        >Completas</span
      >
      <span
        @click="tasks.getPendientes"
        class="inline-block bg-gray-300 rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-500 cursor-pointer shadow-lg"
        >Pendientes</span
      >
    </div>
  </div>
</template>

<!-- <style scoped>
.list-wrapper {
  background: rgb(190, 190, 190);
}
.list-wrapper.dark {
  background: rgb(101, 101, 101);
}
input.tarea {
  border-radius: 5px;
}

input.tarea.dark {
  background: #434343;
}

.badge {
  top: -8px;
}
</style> -->
