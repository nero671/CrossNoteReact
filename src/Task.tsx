import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditaleSpan";
import {TasksType} from "./TodoList";

export type TasksPropsType = {
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void,
    removeTask: (id: string, todolistId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void,
    task: TasksType,
    todolistId: string
}

export const Task = React.memo( (props: TasksPropsType) => {
    const onChangeTitleHandler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.task.id, props.changeTaskTitle, props.todolistId]);

    const onRemoveTask = () => props.removeTask(props.task.id, props.todolistId);
    const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
    }

    return (
        <li
            key={props.task.id}
            className="todolist-list__item"
        >
            <input
                type="checkbox"
                checked={props.task.isDone}
                onChange={ onChangeCheckHandler }
            />
            <EditableSpan title={props.task.title} onChange={ onChangeTitleHandler } />
            <button
                className="todolist-btn"
                onClick={ onRemoveTask }
            >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L12 10.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="#000000"></path>
                </svg>
            </button>
        </li>
    )
})
