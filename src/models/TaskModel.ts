export interface Tarea {
  id: number
  tarea: string
  completa: boolean
}

export interface TareaState {
  loading: boolean
  data: Tarea[]
}
