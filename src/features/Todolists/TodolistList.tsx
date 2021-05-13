import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {TasksType} from "../../trash/App";
import {addTodolistTC, fetchTodolistTC, TodolistDomainType} from "./Todolist/todolistReducer";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

const TodolistList = ( ) => {

    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    let todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch( fetchTodolistTC())
    },[])
    const addTodolist =  useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    return   <div>
        <Grid container>
            <AddItemForm addItemHandler={addTodolist} tittleButton={'Add todolist'}/>
        </Grid>

        <Grid container spacing={6}>
            {
                todolists.map(todolist => {

                    let tasksForTodolist = tasks[todolist.id]

                    return <Grid item key={todolist.id}>
                        <div >
                            <Paper elevation={6}>
                                <Todolist
                                    tasks={tasksForTodolist}
                                    todolistId={todolist.id}
                                    title={todolist.title}
                                    filter={todolist.filter}
                                    todolist={todolist}
                                />
                            </Paper>

                        </div>
                    </Grid>
                })
            }

        </Grid>
    </div>
}
export default TodolistList