

import {v1} from "uuid";

import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    deleteTodolistAC, SetTodolistAC, TodolistDomainType,
    todolistReducer
} from "./todolistReducer";
let todolistId1:string
let todolistId2: string
let initialState: Array<TodolistDomainType>
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    initialState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '',
    order: 0,},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '',
    order: 0,}
    ]
})
test('todolist must be added', () => {
    const titleTodolist = 'NewTodolist'
    const action = addTodolistAC( {id: todolistId1, title: titleTodolist, addedDate: '',
        order: 0,})
    const endState = todolistReducer([], action)

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe(titleTodolist)
})

test('Todolist must be deleted',() => {
    const action = deleteTodolistAC(todolistId1)
    const endState = todolistReducer(initialState, action)
    expect(endState.length).toBe(1)
    }
    )
test('title in todolist must be changed',() => {
    const title = "what to go"
    const action = changeTitleTodolistAC(todolistId1, title)
    const endState = todolistReducer(initialState, action)

    expect(endState[0].title).toBe(title)
})
test('filter in todolist must be changed',() => {
    const filter = 'active'
    const action = changeFilterTodolistAC(filter,todolistId1)
    const endState = todolistReducer(initialState, action)

    expect(endState[0].filter).toBe(filter)
})
test('todolist should be set to the state',() => {

    const action = SetTodolistAC(initialState)
    const endState = todolistReducer([], action)

    expect(endState.length).toBe(2)
})

