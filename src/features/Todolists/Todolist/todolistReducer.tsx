
import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../../api/todolists-api";
import {Dispatch} from "redux";
export type FilterTodolistType = 'all' | 'completed' | 'active'



export const todolistId1 = v1()
export const todolistId2 = v1()
const initialState: Array<TodolistDomainType> = []


export const todolistReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "ADD_TODOLIST":
            return [...state, {...action.todolist, filter: 'all'}]

        case "DELETE_TODOLIST":
            return state.filter(todolist => todolist.id !== action.todolistId)
        case "CHANGE_TITLE_TODOLIST":
            return state.map( todolist => todolist.id === action.todolistId
                ? {...todolist, title: action.title}: todolist)
        case "CHANGE_FILTER_TODOLIST":
            return state.map(todolist => todolist.id === action.todolistId
                ? {...todolist, filter: action.value}: todolist)
        case "SET_TODOLIST":
            return action.todolists.map(todo => ({...todo, filter: "all"}))
        default:
            return state
    }
}

// actions
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD_TODOLIST', todolist}) as const
export const deleteTodolistAC = (id: string) => ({ type: 'DELETE_TODOLIST', todolistId: id}) as const
export const changeTitleTodolistAC = (todolistId: string, title: string) => ({type: 'CHANGE_TITLE_TODOLIST', todolistId, title}) as const
export const changeFilterTodolistAC = (value: FilterTodolistType, todolistId:string) => ({type: 'CHANGE_FILTER_TODOLIST',value, todolistId}) as const
export const SetTodolistAC = (todolists: Array<TodolistType>) => ({type: 'SET_TODOLIST', todolists}) as const
// actions type
export type SetTodolistACType = ReturnType<typeof SetTodolistAC>
export type ChangeFilterTodolistACType = ReturnType<typeof changeFilterTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type ChangeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>

//thunk
export const fetchTodolistTC = () => (dispatch: Dispatch<ActionType>) => {
        todolistsAPI.getTodolist()
            .then((res)=> {
                dispatch(SetTodolistAC(res.data))
            })
}
export const deleteTodolistTC = (todolistId: string) =>  (dispatch:Dispatch<ActionType>) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(deleteTodolistAC(todolistId))
            })
}
export const addTodolistTC = (title: string) =>(dispatch:Dispatch<ActionType>) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
}
export const updateTodolistTitleTC = (todolistId: string,title: string) => (dispatch:Dispatch<ActionType>) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(() => {
                dispatch(changeTitleTodolistAC(todolistId, title))
            })
}

//types
type ActionType =
    | AddTodolistACType
    | DeleteTodolistACType
    | ChangeTitleTodolistACType
    | ChangeFilterTodolistACType
    | SetTodolistACType
export type TodolistDomainType = TodolistType & {
    filter: FilterTodolistType
}
