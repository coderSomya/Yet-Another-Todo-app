export interface iTodo {
    id: String,
    title: String,
    tags: String[],
    completed: Boolean
}

export interface GetTodosData{
    getTodos: iTodo[]
}