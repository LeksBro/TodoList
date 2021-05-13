
import {TasksType} from "../../../trash/App";
import {AddTodolistACType, DeleteTodolistACType,SetTodolistACType} from "./todolistReducer";
import {TaskPriorities,TaskType, todolistsAPI, UpdateTaskType} from "../../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../App/store";



const initialState: TasksType = {}

export const taskReducer = (state: TasksType = initialState, action: ActionType):TasksType => {
    switch (action.type) {
        case "ADD_TASK":{
            return {
                ...state,
                [action.task.todoListId]: [  action.task, ...state[action.task.todoListId]]
            }
        }
        case "DELETE_TASK":{
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter( task => task.id !== action.taskId)
            }
        }
        case 'UPDATE_TASK':{
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model}: task)
            }
        }
        case "ADD_TODOLIST":
            return {...state,
                [action.todolist.id]: []}
        case "DELETE_TODOLIST":{
            const copyTasks = {...state}
            delete copyTasks[action.todolistId]
            return copyTasks
        }
        case "SET_TODOLIST":{
           let stateCopy = {...state}
            action.todolists.forEach(todo => {
                stateCopy[todo.id] = []
            })
            return stateCopy
        }
        case "SET_TASK":{
            return {
                ...state,
                [action.todolisId]: action.tasks
            }
        }

        default:
            return state
    }
}
//actions
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD_TASK', todolistId, task}) as const
export const deleteTaskAC = (todolistId: string, taskId: string) => ({type: 'DELETE_TASK', todolistId, taskId}) as const
export const updateTaskAC = (model:UpdateDomainTaskModelType , taskId: string, todolistId: string) => ({type: 'UPDATE_TASK', model, taskId, todolistId,}) as const
export const setTaskAC = (tasks: Array<TaskType>,todolisId: string) => ({type: 'SET_TASK', todolisId, tasks}) as const
// thunks
export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
        todolistsAPI.getTasks(todolistId)
            .then((res)=> {
                dispatch(setTaskAC(res.data.items, todolistId))
            })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(deleteTaskAC(todolistId, taskId))
            })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
              dispatch(addTaskAC(todolistId,res.data.data.item))
            })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch<ActionType>, getState:() => AppRootStateType) => {
        const state = getState()
      const task = state.tasks[todolistId].find(t => t.id === taskId )
        if (task) {
           const apiModel: UpdateTaskType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: TaskPriorities.Low,
                startDate: task.startDate,
                deadline: task.deadline,
               ...domainModel

            }
           /*
           Так делать нельзя потомучто мы отправим на сервер не нужные свойства
           const model = {
                ...task,
                status: status,
                priority: TaskPriorities.Low
            }*/
            todolistsAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                        dispatch(updateTaskAC(domainModel,taskId,todolistId))
                })

        } else {
           // throw new Error('Task not found in the state')
            console.warn('Task not found in the state')
            return
        }
}

//type actions
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type setTaskACType =ReturnType<typeof setTaskAC>
// type
export type UpdateDomainTaskModelType = {
    title?: string
    description?: null
    status?: number
    priority?: number
    startDate?: null
    deadline?: null
}
type ActionType =
    | AddTaskACType
    | DeleteTaskACType
    |  AddTodolistACType
    | DeleteTodolistACType
    | SetTodolistACType
    | setTaskACType
    | UpdateTaskACType
