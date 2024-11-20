import { Login, CreateUser, Logout } from "./auth/AuthController";
import { crearTarea, obtenerTareas, obtenerTarea, actualizarTarea, eliminarTarea } from "./task/TaskController";

export const API = {
    // Login & Register
    Login,
    CreateUser,
    Logout,
    // Tareas
    crearTarea,
    obtenerTareas,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea
}