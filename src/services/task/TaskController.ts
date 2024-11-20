import { apiInstance } from "../api"
import type { CrearTarea } from "@/models/TaskRequestModels"
import type { TaskApiResponse } from "@/models/TaskApiResponseModel"

/**
 * Crear una tarea
 * @param task 
 * @returns 
 */
export async function crearTarea(task: CrearTarea) { 
    return await apiInstance.post<TaskApiResponse>('/todo', task)
}

/**
 * Obtener todas las tareas
 * @returns 
 */
export async function obtenerTareas() {
    return await apiInstance.get<TaskApiResponse[]>('/todo')
}

/**
 * Obtener una tarea
 * @param id 
 * @returns 
 */
export async function obtenerTarea(id: number) {
    return await apiInstance.get<TaskApiResponse>(`/todo/${id}`)
}

/**
 * Actualizar una tarea
 * @param id 
 * @param task 
 * @returns 
 */
export async function actualizarTarea(id: number, task: CrearTarea) {
    return await apiInstance.patch<TaskApiResponse>(`/todo/${id}`, task)
}

/**
 * Eliminar una tarea
 * @param id 
 * @returns 
 */
export function eliminarTarea(id: number) {
    return apiInstance.delete(`/todo/${id}`)
}