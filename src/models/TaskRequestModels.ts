type EstadoTarea = 'Completada' | 'Incompleta' 

export interface CrearTarea {
    title: string;
    description: EstadoTarea 
}
