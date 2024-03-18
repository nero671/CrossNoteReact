import React, {useReducer, useState} from 'react';
import {TasksType, TodoList} from "./TodoList";
import './App.css';

import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValueType = 'active' | 'completed' | 'all'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

function AppReactRedux() {

    const dispatch = useDispatch();

    // @ts-ignore
    const todolist = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);
    // @ts-ignore
    const tasks = useSelector<AppRootState, TaskStateType >(state => state.tasks);


    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }

    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }

    function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newValue, todolistId);
        dispatch(action);
    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        const action = changeTodolistTitleAC(newTitle, todolistId);
        dispatch(action);
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }

    const removeTodoList = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);

        dispatch(action);
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
    }

    return (
      <div className="App">
        <div className="wrapper">
            <header className="App-header">
              <p>
                CROSSNOTE
              </p>
            </header>

            <div className="todolist__main-title_wrapper">
                <h1 className="todolist__main-title">
                    Your note!
                </h1>
                <AddItemForm addItem={ addTodoList } />
            </div>

            <div className="todolist-wrapper">
                {
                    todolist.map(item => {

                        let tasksForToDoList = tasks[item.id];

                        if(item.filter === 'completed') {
                            tasksForToDoList = tasksForToDoList.filter(item => item.isDone === true);
                        }

                        if(item.filter === 'active') {
                            tasksForToDoList = tasksForToDoList.filter(item => item.isDone === false);
                        }

                        return <TodoList
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            filter={item.filter}
                            tasks={tasksForToDoList}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    })
                }

            </div>

        </div>
      </div>
  );
}

export default AppReactRedux;
