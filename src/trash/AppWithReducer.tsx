import React, {useReducer} from "react";
import '../App/App.css';

import {v1} from "uuid";

import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Menu} from "@material-ui/icons";
import {addTaskAC, deleteTaskAC, taskReducer, updateTaskAC} from "../features/Todolists/Todolist/taskReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    deleteTodolistAC,
    todolistReducer
} from "../features/Todolists/Todolist/todolistReducer";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {Todolist} from "../features/Todolists/Todolist/Todolist";
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type FilterTodolistType = 'all' | 'completed' | 'active'
export const AppWithReducer: React.FC = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchTodolist] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate: '',order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all',addedDate: '',order: 0}
    ])

    const [tasks, dispatchTasks] = useReducer(taskReducer,
        {
            [todolistId1]: [
                {id: v1(), title: 'HTML', status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1},
                {id: v1(), title: 'CSS', status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1},
                {id: v1(), title: 'JS', status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1},
                {id: v1(), title: 'REACT',status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1},
            ],
            [todolistId2]: [
                {id: v1(), title: 'bread',  status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1},
                {id: v1(), title: 'milk',  status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1},
                {id: v1(), title: 'potatoes',  status: TaskStatuses.Completed,startDate: null,deadline: null,description: null,addedDate: '',order: 0,priority: TaskPriorities.Low, todoListId: todolistId1}
            ]
        }
    )

   function deleteTask(taskId: string, todolistId: string) {
    dispatchTasks(deleteTaskAC(todolistId, taskId))
}

    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(todolistId, {
            id: v1(), title: title,
            status: TaskStatuses.Completed, startDate: null, deadline:
                null, description: null, addedDate: '', order: 0, priority:
            TaskPriorities.Low, todoListId: todolistId1
        },))
    }

function changeFilterTodolist(value: FilterTodolistType, todolistId: string) {
    dispatchTodolist(changeFilterTodolistAC(value, todolistId))
}

function changeStatusTask(taskId: string, status:TaskStatuses, todolistId: string) {
    dispatchTasks(updateTaskAC({status}, taskId, todolistId))
}

function changeTitleTask(taskId: string, title: string, todolistId: string) {
    dispatchTasks(updateTaskAC({title}, todolistId, taskId))
}

function changeTitleTodolist(title: string, todolistId: string) {
    dispatchTodolist(changeTitleTodolistAC(todolistId, title))
}

function addTodolist(title: string) {
    let action = addTodolistAC({id: todolistId1, title: 'What to learn',addedDate: '',order: 0})
    dispatchTodolist(action)
    dispatchTasks(action)
}

function deleteTodolist(todolistId: string) {
    let action = deleteTodolistAC(todolistId)
    dispatchTodolist(action)
    dispatchTasks(action)
}

return (<>

        <nav>
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
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
                    {todolists.map(todolist => {


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
                                return  copyTask.status === TaskStatuses.New
                            })
                        }

                        return <Grid item>
                            <div key={todolist.id}>

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


export default AppWithReducer