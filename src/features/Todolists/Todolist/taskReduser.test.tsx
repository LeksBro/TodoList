import {v1} from "uuid";
import {addTaskAC, updateTaskAC, deleteTaskAC, setTaskAC, taskReducer} from "./taskReducer";
import {TasksType} from "../../../trash/App";
import {addTodolistAC, deleteTodolistAC, SetTodolistAC} from "./todolistReducer";
import {TaskPriorities, TaskStatuses} from "../../../api/todolists-api";


const todolistId1: string = v1()
const todolistId2: string = v1()
let initialState: TasksType
beforeEach(() => {
    initialState = {
        [todolistId1]: [
            {
                id: '1',
                title: 'HTML',
                status: TaskStatuses.New,
                startDate: null,
                deadline: null,
                description: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
            {
                id: '2',
                title: 'CSS',
                status: TaskStatuses.Completed,
                startDate: null,
                deadline: null,
                description: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
            {
                id: '3',
                title: 'JS',
                status: TaskStatuses.New,
                startDate: null,
                deadline: null,
                description: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },

        ],
        [todolistId2]: [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                startDate: null,
                deadline: null,
                description: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                startDate: null,
                deadline: null,
                description: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            },
            {
                id: '3',
                title: 'potatoes',
                status: TaskStatuses.New,
                startDate: null,
                deadline: null,
                description: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            }
        ]
    }
})

test("The task must be added", () => {
    const titleTask = 'TaskAdded'
    const action = addTaskAC(todolistId1, {
        id: '1',
        title: titleTask,
        status: TaskStatuses.New,
        startDate: null,
        deadline: null,
        description: null,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        todoListId: 'todolistId1'
    })
    const endState = taskReducer(initialState, action)

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe(titleTask)
})

test('The task must be deleted', () => {
    const action = deleteTaskAC(todolistId1, '1')
    const endState = taskReducer(initialState, action)

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe('CSS')
})

test('Title value must be changed', () => {
    const title = 'SCSS'
    const action = updateTaskAC({title}, '3', todolistId1  )
    const endState = taskReducer(initialState, action)

    expect(endState[todolistId1][2].title).toBe(title)
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2][2].title).toBe('potatoes')
})

test('Status task must be changed', () => {
    const status = TaskStatuses.New
    const action = updateTaskAC({status}, '1', todolistId2)
    const endState = taskReducer(initialState, action)
    expect(endState[todolistId2][0].status).toBeFalsy()
    expect(endState[todolistId1][0].status).toBeFalsy()
})
test('when adding a todolist, the array with tasks must be empty', () => {

    const action = addTodolistAC({
        id: 'todolistId1', title: 'What to learn', addedDate: '',
        order: 0,
    })
    const endState = taskReducer(initialState, action)

    expect(Object.keys(endState).length).toBe(3)
})
test('when deleting a todolist, tasks can also be deleted', () => {
    const action = deleteTodolistAC(todolistId1)
    const endState = taskReducer(initialState, action)
    expect(Object.keys(endState).length).toBe(1)
    expect(endState[0]).toBe(undefined)
})

test('empty array should be added when we set todolist', () => {
    const action = SetTodolistAC([
        {
            id: todolistId1, title: 'What to learn', addedDate: '',
            order: 0,
        },
        {
            id: todolistId2, title: 'What to buy', addedDate: '',
            order: 0,
        }
    ])
    const endState = taskReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState[todolistId1]).toBeDefined()
    expect(endState[todolistId2]).toBeDefined()

})
test('array task shoul be set in todolist', () => {

    const action = setTaskAC(initialState[todolistId1], todolistId1)
    const endState = taskReducer({
        [todolistId1]: [],
        [todolistId2]: [],

    }, action)
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1].length).toBe(3)

})