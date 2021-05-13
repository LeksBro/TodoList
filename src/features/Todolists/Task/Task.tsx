import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../components/EditablSpan/EditableSpan";
import {HighlightOff} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import {
    updateTaskTC,
    deleteTaskTC,
} from "../Todolist/taskReducer";
import {useDispatch} from "react-redux";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";


export type TasksPropsType = {
    todolistId: string
    task: TaskType
}

 export const Task = React.memo((props: TasksPropsType) => {
     console.log('taskRerender')

     let dispatch = useDispatch()

     const changeStatusTaskHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
         let newIsDoneValue = e.currentTarget.checked
         let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
         dispatch(updateTaskTC(props.todolistId, props.task.id,{status}))
     },[props.task.id, props.todolistId])

     const deleteTaskHandler = useCallback( () => {
            dispatch(deleteTaskTC(props.todolistId, props.task.id))
     },[props.todolistId, props.task.id])

     const  changeTaskTitleHandler = useCallback((title: string) => {
         dispatch(updateTaskTC(props.todolistId, props.task.id, {title}))
     },[dispatch,props.todolistId,props.task.id])
     return <div>
             <section>
                 <Checkbox defaultChecked color="primary" onChange={changeStatusTaskHandler} checked={props.task.status === TaskStatuses.Completed}/>
                 <EditableSpan changeTitle={changeTaskTitleHandler}  title={props.task.title}/>
                 <IconButton aria-label="delete" onClick={deleteTaskHandler} color={"primary"}>
                     <HighlightOff color="inherit" style={{ fontSize: 20 }} />
                 </IconButton>
             </section>
     </div>
 })