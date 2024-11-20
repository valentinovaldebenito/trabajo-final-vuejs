<script setup lang="ts">
// importar reactive
// importar themeStore
// importar taskStore
// importar modelo de tarea
import { reactive } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'
import type { Tarea } from '@/models/TaskModel'

// iconos
//import { XMarkIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
//import { CheckCircleIcon as SolidCircleIcon } from '@heroicons/vue/24/solid'

// definir variable para almacenar useThemeStore
// definir variable reactiva pasando objeto themeStore
//const themeStore = useThemeStore()
//const theme = reactive(themeStore)

// definir variable para almacenar useTaskStore
// definir variable reactiva pasando objeto tasksStore
const taskStore = useTaskStore()
const tasks = reactive(taskStore)

const nuevaTarea: Tarea = {
  id: 0,
  tarea: '',
  completa: false,
}

const reactiveTask = reactive(nuevaTarea)

function makeItComplete() {
  reactiveTask.completa = !reactiveTask.completa
}

function guardarTarea() {
  tasks.agregarTarea(reactiveTask)
}
</script>

<template>
  <div class="w-full h-full bg-red-600">
    <div class="absolute top-3 sm:top-4 left-5">
      <div class="relative">
        <input
          type="ckeckbox"
          @click="makeItComplete"
          class="border rounded-full focus:ouline-none h-6 w-6 cursor-pointer transition ease-linear"
        />
        <!-- SI ES TAREA COMPLETA CON V-IF -->
        <SolidCircleIcon
          @click="makeItComplete"
          v-if="reactiveTask.completa"
          class="h-100 w-100 absolute left-0 top-0 text-green-500"
        />
      </div>
    </div>

    <form @submit.prevent>
      <input
        v-model="nuevaTarea.tarea"
        type="text"
        placeholder="Escribe una nueva tarea"
        class="sm:text-base overflow-ellipsis w-full focus:outline-none py-4 sm:py-4.5 pr-8 pl-14 sm:pl-16 cursor-pointer transition ease-linear"
      />

      <div class="flex justify-around cursor-default transition ease-linear">
        botones
        <button class="p-1 cursor-pointer" @click="guardarTarea">Guardar Tarea</button>
        <button class="p-1 cursor-pointer">Eliminar Tarea?</button>
      </div>
    </form>
  </div>
</template>
