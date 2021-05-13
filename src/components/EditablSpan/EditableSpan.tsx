import {ChangeEvent, useState} from "react";
import React from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
console.log('EditableSpan')
    const [editMod, setEditMod] = useState(false)
    const [title, setTitle] = useState('')

    function activateEditMod() {
        setEditMod(true)
        setTitle(props.title)
    }
    function deactivateEditMod() {
        setEditMod(false)
        props.changeTitle(title)
    }
    function changeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }


    return <>
        {editMod
            ? <TextField label="value" onChange={changeTitleHandler} value={title} onBlur={deactivateEditMod} autoFocus/>
            : <span onDoubleClick={activateEditMod}>{props.title}</span>
        }
    </>
})