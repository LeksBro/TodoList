import {TasksType} from "../../../trash/App";
import {addTodolistAC, TodolistDomainType, todolistReducer} from "./todolistReducer";
import {taskReducer} from "./taskReducer";

test('id should be equal',() => {
    const startTaskState: TasksType = {}
    const startTodolistState:Array<TodolistDomainType> = []

    const action = addTodolistAC({id: 'todolistId1', title: 'What to learn', addedDate: '',
        order: 0,})

    const endTaskState = taskReducer(startTaskState, action)
    const endTodolistState = todolistReducer(startTodolistState, action)

    const keys = Object.keys(endTaskState)
    const idFromTask =keys[0]
    const idFromTodolist = endTodolistState[0].id

    expect(idFromTask).toBe(action.todolist.id)
    expect(idFromTodolist).toBe(action.todolist.id)
})