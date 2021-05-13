import axios from "axios";

const setting = {
    withCredentials: true,
    headers: {
        'API-KEY': '7d68f88a-b19d-4456-a61f-b1ed7a13dce8'

    }
}
const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...setting
})
//api
export const todolistsAPI = {
    getTodolist(){
        let promise = instanse.get<Array<TodolistType>>('todo-lists')
        return promise
    },
    createTodolist(title: string){
        let promise = instanse.post<ResponseType<{item: TodolistType}>>('todo-lists',{title})
        return promise
    },
    deleteTodolist(id: string){
       return  instanse.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string){
        return instanse.put<ResponseType>(`todo-lists/${id}`,{title})
    },
    getTasks(todolistId: string){
        return  instanse.get<TasksGetResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string){
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string){
        return instanse.post<CreateTaskType>(`todo-lists/${todolistId}/tasks`,{title})
    },
    updateTask(todolistId: string, taskId: string, model:UpdateTaskType){
        return instanse.put(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

//types
export type TodolistType = {
    id: string,
    title: string
    addedDate: string,
    order: number,
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress= 1,
    Completed = 3,
    Draft = 4,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    addedDate: string
    deadline: null
    description: null
    id: string
    order: number
    priority: TaskPriorities
    startDate: null
    status: TaskStatuses
    title: string
    todoListId: string
}
type TasksGetResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
export type UpdateTaskType = {
    title: string
    description: null
    status: number
    priority: number
    startDate: null
    deadline: null
}
type CreateTaskType = {
    data: {
        item: TaskType
    }
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: string
}