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

export type FilterValueType = 'active' | 'completed' | 'all'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

function AppRedux() {

    let todollistId1 = v1();
    let todollistId2 = v1();


    let [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todollistId1]: [
            {id: v1(), title: 'task1', isDone: true},
            {id: v1(), title: 'task2', isDone: true},
            {id: v1(), title: 'task3', isDone: false},
        ],
        [todollistId2]: [
            {id: v1(), title: 'task1-1', isDone: true},
            {id: v1(), title: 'task2-2', isDone: false},
        ],
    })

    let [todolist, dispatchTodoList] = useReducer(todolistsReducer, [
        {id: todollistId1, title: 'What to learn', filter: 'all'},
        {id: todollistId2, title: 'What to learn2', filter: 'active'}
    ]);

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatchTasks(action);
    }

    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatchTasks(action);
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatchTasks(action);
    }

    function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newValue, todolistId);
        dispatchTasks(action);
    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        const action = changeTodolistTitleAC(newTitle, todolistId);
        dispatchTodoList(action);
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatchTodoList(action);
    }

    const removeTodoList = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);

        dispatchTasks(action);
        dispatchTodoList(action);
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title);

        dispatchTasks(action);
        dispatchTodoList(action);
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

export default AppRedux;
