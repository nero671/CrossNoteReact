import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValueType} from "./App";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from "./EditaleSpan";
import {AddItemForm} from "./AddItemForm";
import {Task} from "./Task";


export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export type PropsType = {
    id: string,
    title: string,
    filter: FilterValueType,
    tasks: Array<TasksType>,
    changeFilter: (value: FilterValueType, todolistId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    removeTodoList: (todolistId: string) => void,
    changeTodolistTitle: (newTitle: string, todolistId: string) => void,
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void,
    removeTask: (id: string, todolistId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void,
}

export const TodoList = React.memo( (props: PropsType) => {

    const addTask = useCallback( (title: string) => {
        props.addTask(title, props.id)
    }, []);

    const onAllClickHandler = useCallback( () => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback( () => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback( () => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);

    const onRemoveTodoList = () => props.removeTodoList(props.id);

    const changeTodolistTitle = useCallback( (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }, [props.id, props.changeTodolistTitle]);

    let tasksForToDoList = props.tasks;

    if(props.filter === 'completed') {
        tasksForToDoList = props.tasks.filter(item => item.isDone === true);
    }

    if(props.filter === 'active') {
        tasksForToDoList = props.tasks.filter(item => item.isDone === false);
    }

    return (
        <div className="todolist">
            <div className="todolist__title-wrapper">
                <h1 className="todolist-title">
                    <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                </h1>
                <button
                    className="todolist-btn"
                    onClick={ onRemoveTodoList }
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L12 10.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="#000000"></path>
                    </svg>
                </button>
            </div>

            <AddItemForm addItem={addTask} />

            <ul className="todolist-list">
                {
                    props.tasks.map(item =>
                        <Task
                            task={item}
                            changeTaskTitle={props.changeTaskTitle}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            todolistId={props.id}
                            key={item.id}
                        />
                    )
                }

            </ul>

            <div className="todolist-btn-wrapper">
                <button
                    onClick={ onAllClickHandler }
                    className={props.filter === 'all' ? 'active-filter' : ''}
                >All</button>
                <button
                    onClick={ onActiveClickHandler }
                    className={props.filter === 'active' ? 'active-filter' : ''}
                >Active</button>
                <button
                    onClick={ onCompletedClickHandler }
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                >Completed</button>
            </div>
        </div>
    )
});


