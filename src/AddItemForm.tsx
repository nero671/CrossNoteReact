import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormType = {
    addItem: (title: string) => void,
}

export const AddItemForm = React.memo( (props: AddItemFormType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeInputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) setError(null);
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }
    }

    const addTask = () => {
        if(newTaskTitle.trim() === '') {
            setError('Title is required');
            return
        }

        props.addItem(newTaskTitle);
        setNewTaskTitle('');
    }

    return  (
        <div className="todolist__input-wrapper">
            <input
                placeholder='Add your task'
                value={ newTaskTitle }
                onChange={ onChangeInputTitleHandler }
                onKeyPress={ onKeyPressHandler }
                className={error ? "error" : ""}
            />
            {error && <div className="error-message">Title is required</div>}
            <button
                className="todolist-btn"
                onClick={ addTask }
            >
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px">    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"/></svg>
            </button>
        </div>
    )
})
