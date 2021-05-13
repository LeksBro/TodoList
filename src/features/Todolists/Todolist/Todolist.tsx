import React, {useCallback, useEffect} from "react";
import {EditableSpan} from "../../../components/EditablSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {
    addTodolistTC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    deleteTodolistAC, deleteTodolistTC,
    FilterTodolistType,
    TodolistDomainType, updateTodolistTitleTC,
} from "./todolistReducer";
import {Task} from "../Task/Task";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {addTaskAC, addTaskTC, fetchTaskTC, setTaskAC} from "./taskReducer";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";

type TodolistPropsType = {
    filter: FilterTodolistType
    todolistId: string
    title: string
    todolist: TodolistDomainType
    tasks: Array<TaskType>

}

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log("todolist rerender")

    const dispatch = useDispatch()

useEffect(() => {
    dispatch(fetchTaskTC(props.todolistId))
},[])
    const  addTaskHandler = useCallback((title: string) => {
        dispatch( addTaskTC(props.todolistId,title))

    },[dispatch, props.todolistId])

    const changeTodolistTitleHandler = useCallback(function (title: string) {
        dispatch(updateTodolistTitleTC(props.todolistId,title))
    }, [dispatch, props.todolistId])

    const deleteTodolistHandler = useCallback(function () {
        dispatch(deleteTodolistTC(props.todolistId))
    }, [dispatch, props.todolistId])

    const changeFilterTasksHandler = useCallback(function (value: FilterTodolistType) {
        dispatch(changeFilterTodolistAC(value, props.todolistId))
    }, [dispatch, props.todolistId])

    let taskForTodolist: Array<TaskType> = props.tasks

    if (props.todolist.filter === 'completed') {
        taskForTodolist = props.tasks.filter(task => {
            const copyTask = {...task}
            return copyTask.status === TaskStatuses.Completed
        })
    }

    if (props.todolist.filter === 'active') {
        taskForTodolist = props.tasks.filter(task => {
            const copyTask = {...task}
            return copyTask.status === TaskStatuses.New
        })
    }


    return <div>

        <h4>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitleHandler}/>
            <IconButton aria-label="delete" onClick={deleteTodolistHandler} color={"primary"}>
                <Delete color="inherit" style={{fontSize: 20}}/>
            </IconButton>
            <a>
                <AddItemForm addItemHandler={addTaskHandler} tittleButton={'Add task'}/>
            </a>
        </h4>

        <div>
            {
                taskForTodolist.map(task => {
                    return <div key={task.id}>
                        <Task
                            task={task}
                            todolistId={props.todolistId}
                        />
                    </div>
                })
            }
        </div>

        <section>
            <Button variant="contained" color={props.filter === 'all' ? 'primary' : 'default'}
                    onClick={() => changeFilterTasksHandler('all')}
            >All</Button>
            <Button variant="contained" color={props.filter === 'active' ? 'primary' : 'default'}
                    onClick={() => changeFilterTasksHandler('active')}
            >Active</Button>
            <Button variant="contained" color={props.filter === 'completed' ? 'primary' : 'default'}
                    onClick={() => changeFilterTasksHandler('completed')}
            >Completed</Button>
        </section>
    </div>
})