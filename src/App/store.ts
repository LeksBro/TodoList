import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "../features/Todolists/Todolist/todolistReducer";
import thunk from "redux-thunk";
import {taskReducer} from "../features/Todolists/Todolist/taskReducer";



const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
//@ts-ignore
window .store = store;