import React, {ChangeEvent, KeyboardEvent, MouseEventHandler, useState} from "react";
import {Button, FormControl, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";
 export type AddItemFormPropsType = {
    addItemHandler: (title: string) => void
    tittleButton: string
}


export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    console.log('AddItemForm -----Rerender')
    const [error, setError] = useState<null | string>(null)
    const [title, setTitle] = useState<string>('')

    function handlerChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value.trim())
        setError('')
    }
    function addItemHandler() {
        if(title === ''){
            setError('Field must not be empty')
            return
        }
        props.addItemHandler(title)
        setTitle('')
    }
    function addItemOnKeyPressHandler (e: KeyboardEvent<HTMLDivElement>){
        if(e.charCode === 13){
            if(title === ''){
                setError('Field must not be empty')
                return
            }
            props.addItemHandler(title)
            setTitle('')
        }

    }


    return <div>
        <TextField

            size={"small"}
            variant={"outlined"}className={error? 'errorInput': ''}
            onChange={handlerChangeTitle}
            value={title}
            onKeyPress={addItemOnKeyPressHandler}
            error={error ? true : false}
            id="filled-error"
            label={error? "Error": 'value'}
            defaultValue="Hello World"
            helperText={error}
        />
        <Button
            size={'medium'}
            onClick={addItemHandler}
            variant="contained"
            color="primary"
            startIcon={<Add />}
        >
            {props.tittleButton}
        </Button>
    </div>
})