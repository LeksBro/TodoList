
import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";


export default {
    title: 'API'
}

const setting = {
    withCredentials: true,
    headers: {
        'API-KEY': '7d68f88a-b19d-4456-a61f-b1ed7a13dce8'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolist()
           .then((res) => {
            setState(res.data)
       })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
            todolistsAPI.createTodolist('dfddfd')
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
         todolistsAPI.deleteTodolist('a')
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)     
    useEffect(() => {
        let todolistId = '8fe75220-a649-4baa-8b9b-005b0c5ded35'
            todolistsAPI.updateTodolist(todolistId, 'blalblbllbllalalalblaablabllablablabl')
           .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
        useEffect(() => {
            const todolistId = '8fe75220-a649-4baa-8b9b-005b0c5ded35'
            todolistsAPI.getTasks(todolistId)
                .then((res) => {
                    setState(res.data)
                })
        },[])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const taskId = ''
        const todolistId = ''
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8fe75220-a649-4baa-8b9b-005b0c5ded35'
        const title = 'Privet'
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data.data.item)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const model = {
        title: 'UpdateTask',
        description: null,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null
    }
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8fe75220-a649-4baa-8b9b-005b0c5ded35'
        const taskId = 'cf3a5212-c632-4ff5-b434-437f38da0133'
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                debugger
                setState(res.data)
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}

