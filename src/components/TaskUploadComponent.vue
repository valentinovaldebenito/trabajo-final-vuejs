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

/* function makeItComplete() {
  reactiveTask.completa = !reactiveTask.completa
} */

function guardarTarea() {
  tasks.agregarTarea(reactiveTask)
}
</script>

<template>
  <div class="flex flex-col w-full h-full rounded-md pt-3">
    <!-- <div class="">
      <div class="">
        <input type="ckeckbox" @click="makeItComplete" class="rounded-full focus:ouline-none h-6 w-6 cursor-pointer transition ease-linear" />
        <SolidCircleIcon @click="makeItComplete" v-if="reactiveTask.completa" class="h-100 w-100 absolute text-green-500" />
      </div>
    </div> -->

    <form @submit.prevent>
      <div class="flex justify-center w-full">
        <input
          v-model="nuevaTarea.tarea"
          type="text"
          placeholder="Escribe una nueva tarea"
          class="sm:text-base overflow-ellipsis w-10/12 border border-solid border-slate-400 rounded-md py-4 sm:py-4.5 pr-8 pl-14 sm:pl-16 cursor-pointer transition ease-linear"
        />
      </div>

      <div class="flex w-full justify-center items-center transition ease-linear py-2">
        <div class="flex justify-end w-10/12">
          <button class="p-2 bg-[#40b882] text-white rounded-md cursor-pointer" @click="guardarTarea">Guardar Tarea</button>
          <!-- <button class="p-1 bg-white rounded-md cursor-pointer">Eliminar Tarea?</button> -->
        </div>
      </div>
    </form>
  </div>
</template>
