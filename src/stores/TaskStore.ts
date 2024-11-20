import { defineStore } from 'pinia'
import type { TareaState, Tarea } from '@/models/TaskModel'

interface TaskFilterState extends TareaState {
  completed: Tarea[]
  pending: Tarea[]
  all: Tarea[]
}

export const useTaskStore = defineStore({
  id: 'id',
  state: (): TaskFilterState => ({
    loading: false,
    data: [],
    all: [],
    completed: [],
    pending: [],
  }),
  actions: {
    agregarTarea(tarea: Tarea) {
      const idTarea: number = this.data.length
      const nuevaTarea: Tarea = { ...tarea, id: idTarea }
      this.data.push(nuevaTarea)
      this.all.push(nuevaTarea)
      if (nuevaTarea.completa) {
        this.completed.push(nuevaTarea)
      } else {
        this.pending.push(nuevaTarea)
      }
    },
    eliminarTarea(tarea: Tarea) {
      this.data = this.data.filter((item) => item.id !== tarea.id)
      this.completed = this.completed.filter((item) => item.id !== tarea.id)
      this.pending = this.pending.filter((item) => item.id !== tarea.id)
      this.all = this.data
    },
    cambiarEstado(tarea: Tarea) {
      const index = this.data.findIndex((item) => item.id === tarea.id)
      this.data[index].completa = !this.data[index].completa
      if (this.data[index].completa) {
        this.completed.push(this.data[index])
      } else {
        this.completed = this.completed.filter((item) => item.id !== this.data[index].id)
      }
    },
    getCompletas() {
      this.data = this.completed
    },
    getPendientes() {
      this.data = this.pending
    },
    getAll() {
      this.data = this.all
    },
  },
})
