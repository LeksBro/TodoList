import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {taskReducer} from "./features/Todolists/Todolist/taskReducer";
import {todolistId1, todolistId2, todolistReducer} from "./features/Todolists/Todolist/todolistReducer";
import {AppRootStateType} from "./App/store";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",addedDate: '',order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all",addedDate: '',order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS",status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: 'todolistId1'},
            {id: v1(), title: "JS",status: TaskStatuses.New,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: 'todolistId1'}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk",status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: 'todolistId2'},
            {id: v1(), title: "React Book",status: TaskStatuses.New,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: 'todolistId2'}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}