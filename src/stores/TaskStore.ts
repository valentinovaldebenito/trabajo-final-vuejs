import { defineStore } from 'pinia'
import type { TareaState, Tarea } from '@/models/TaskModel'
import type { CrearTarea } from '@/models/TaskRequestModels'
import { API } from '@/services'

/**
 * Estado de las tareas
 */
interface TaskFilterState extends TareaState {
  completed: Tarea[]
  pending: Tarea[]
  all: Tarea[]
}

export const useTaskStore = defineStore({
  id: 'tareas',
  state: (): TaskFilterState => ({
    loading: false,
    data: [],
    all: [],
    completed: [],
    pending: [],
  }),
  actions: {

    /**
     * Agregar una tarea
     * @param tarea 
     */
    async agregarTarea(tarea: Tarea) {
      this.loading = true; 
      try {
          let apiTask: CrearTarea = { title: tarea.tarea, description: tarea.completa? 'Completada' : 'Incompleta'};
          const response = await API.crearTarea(apiTask);
          if( response.status === 201 ) {
              let tId: number = response.data.id!
              let newTask: Tarea =  { ...tarea, id: tId }
              this.data.push(newTask) 
              this.all.push(newTask) 
              await this.obtenerTareas() 
          }
      }catch (e){
          console.error('Error creando la tarea', e) 
          this.loading = false 
      }
    },

    /**
     * Eliminar una tarea
     * @param tarea 
     */
    async eliminarTarea(tarea: Tarea) {
      this.loading = true;
      try {
          const response = await API.eliminarTarea(tarea.id!);
          if(response.status === 200) {
              console.info('Tarea eliminada con exito')
          }
      } catch (e) {
          console.error('Error eliminando la tarea', e) 
          this.loading = false 
      }
      this.data = this.data.filter(t => t.id !== tarea.id)
      this.all = this.all.filter(t => t.id !== tarea.id)
      await this.obtenerTareas()
    },

    /**
     * Obtener todas las tareas
     */
    async obtenerTareas() {
      if(this.loading === false) {
          this.loading = true;
      }
      try { 
        const response = await API.obtenerTareas(); 
        if( response.status === 200 ) {
          response.data.forEach( tarea => {
            const retrievedTask: Tarea = {
              id: tarea.id!, 
              tarea: tarea.title!, 
              completa: tarea.description === 'Completada'? true : false 
            } 
            this.data.push(retrievedTask) 
            this.all.push(retrievedTask) 
          });
          const uniqueTasks = this.all.filter((task, index, self) => self.findIndex(t => t.id === task.id) === index);
          this.data = uniqueTasks
          this.all = uniqueTasks
          this.completed = uniqueTasks.filter(task => task.completa) 
          this.pending = uniqueTasks.filter(task => !task.completa) 
          this.loading = false 
        }
      } catch (e) {
        console.error('Error Obteniendo las tarea', e) 
        this.loading = false 
      }
    },

    /**
     * Cambiar el estado de una tarea
     * @param tarea 
     */
    async cambiarEstado(tarea: Tarea) {
      this.loading = true; 
      const index = this.data.findIndex((item) => item.id === tarea.id) 
      this.data[index].completa = !this.data[index].completa 
      const apiToBeUpdateTask: CrearTarea = {
          title: this.data[index].tarea,
          description: this.data[index].completa? 'Completada' : 'Incompleta'
      }
      try {
          const response = await API.actualizarTarea(tarea.id!, apiToBeUpdateTask)
          this.loading = false 
      } catch (e) {
          console.error('Error actualizando la tarea', e) 
          this.loading = false 
      }
      if(this.data[index].completa) {
          this.completed.push(this.data[index])
      }
      else {
          this.completed = this.completed.filter((item) => item.id !== this.data[index].id)
      }
    },

    /**
     * Obtener las tareas completadas
     */
    getCompletas() {
      this.data = this.completed
    },

    /**
     * Obtener las tareas pendientes
     */
    getPendientes() {
      this.data = this.pending
    },

    /**
     * Obtener todas las tareas
     */
    getAll() {
      this.data = this.all
    },
  },
})
