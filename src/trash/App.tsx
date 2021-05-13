import React, {useState} from "react";
import '../App/App.css';
import {v1} from "uuid";

import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {TodolistDomainType} from "../features/Todolists/Todolist/todolistReducer";
import {FilterTodolistType} from "./AppWithReducer";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {Todolist} from "../features/Todolists/Todolist/Todolist";


export type TasksType = {
    [key: string]: Array<TaskType>
}




const App: React.FC = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolist] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: 'What to learn',addedDate: '', order: 0, filter: 'all'},
        {id: todolistId2, title: 'What to buy',addedDate: '', order: 0, filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksType>(
        {
            [todolistId1]:  [
                {id: v1(), title: 'HTML',status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1},
                {id: v1(), title: 'CSS', status: TaskStatuses.New,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1 },
                {id: v1(), title: 'JS', status: TaskStatuses.New,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1 },
                {id: v1(), title: 'REACT', status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1 },
            ],
            [todolistId2]: [
                {id: v1(), title: 'bread', status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId2},
                {id: v1(), title: 'milk', status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId2},
                {id: v1(), title: 'potatoes', status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId2 }
            ]
        }

    )

    function deleteTask(taskId: string, todolistId: string) {
        setTasks(  {
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => {
                let copyTask = {...task}
                return copyTask.id !== taskId
            })
        })

    }
    function addTask(title: string, todolistId: string) {
        let newTask:TaskType = {id: v1(), title, status: TaskStatuses.New,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId}

        setTasks({
            ...tasks,
            [todolistId]: [ newTask,...tasks[todolistId]]
        })
    }
    function changeFilterTodolist(value: FilterTodolistType, todolistId: string) {
     let filterTodolist =  todolists.map(todolist => todolist.id === todolistId? {...todolist, filter: value}: todolist)
        setTodolist(filterTodolist)

    }
    function changeStatusTask(taskId: string, status: TaskStatuses, todolistId: string) {

        setTasks( {
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, status}: task)
        })
    }
    function changeTitleTask(taskId: string, title: string, todolistId: string) {
            setTasks({...tasks,
                [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title}: task)
            })
    }
    function changeTitleTodolist(title: string, todolistId: string) {
        {
           setTodolist(todolists.map( todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
        }
    }
    function addTodolist(title: string) {
            let newTodolist: TodolistDomainType = {id: v1(), title, filter: 'all',addedDate: '',order: 0}
           setTodolist([newTodolist, ...todolists])
            setTasks({...tasks,
                               [newTodolist.id]: [] })
    }
    function deleteTodolist(todolistId: string) {
                setTodolist(todolists.filter(todolist => todolist.id !== todolistId) )
                let copyTask = {...tasks}
                if (copyTask){
                    delete copyTask[todolistId]
                    setTasks(copyTask)
                }


    }

    return (<>

            <nav>
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        Todolists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            </nav>
            <Container fixed>
    <div>
        <Grid container>
            <AddItemForm addItemHandler={addTodolist} tittleButton={'Add todolist'}/>
        </Grid>
        <Grid container spacing={6}>
            {todolists.map( todolist => {
                let taskForTodolist = tasks[todolist.id]

                if (todolist.filter === 'completed') {
                    taskForTodolist = tasks[todolist.id].filter(task => {
                        const copyTask = {...task}
                        return copyTask.status === TaskStatuses.Completed
                    })
                }

                if (todolist.filter === 'active') {
                    taskForTodolist = tasks[todolist.id].filter(task => {
                        const copyTask = {...task}
                        return copyTask.status === TaskStatuses.New
                    })
                }

            return<Grid item><div key={todolist.id}>
                let tasksForTodolist = tasks[todolist.id]
                <Paper elevation={6}>
                    <Todolist
                        tasks={taskForTodolist}
                        todolistId={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
                        todolist={todolist}
                    />
                </Paper>

                </div>
            </Grid>
            })}

        </Grid>
        </div>
    </Container>
        </>
    );
}

export default App;
