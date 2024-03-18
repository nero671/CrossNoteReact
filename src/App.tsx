import React, {useState} from 'react';
import {TasksType, TodoList} from "./TodoList";
import './App.css';

import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = 'active' | 'completed' | 'all'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    let todollistId1 = v1();
    let todollistId2 = v1();


    let [tasks, setTasks] = useState<TaskStateType>({
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

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todollistId1, title: 'What to learn', filter: 'all'},
        {id: todollistId2, title: 'What to learn2', filter: 'active'}
    ]);

    const addTask = (title: string, todolistId: string) => {
        let newTaskObj = {id: v1(), title: title, isDone: false};
        let task = tasks[todolistId];

        let newTask = [newTaskObj, ...task];
        tasks[todolistId] = newTask;
        setTasks({...tasks});
    }

    const removeTask = (id: string, todolistId: string) => {
        let task = tasks[todolistId];
        let filterTask = task.filter(item => {
            return item.id !== id
        } );

        tasks[todolistId] = filterTask;
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let task = tasks[todolistId];
        let checkedTask = task.find(item => item.id === id);

        if(checkedTask) {
            checkedTask.isDone = isDone;
        }

        setTasks({...tasks})
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolists = todolist.find(item => item.id === todolistId);

        if(todolists) {
            todolists.filter = value;
            setTodolist([...todolist])
        }
    }

    const removeTodoList = (todolistId: string) => {
        let filteredTodoList = todolist.filter(item => item.id !== todolistId);
        setTodolist(filteredTodoList);

        delete tasks[todolistId];
        setTasks({...tasks});
    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        let todolists = todolist.find(item => item.id === todolistId);

        if(todolists) {
            todolists.title = newTitle;
            setTodolist([...todolist]);
        }
    }

    function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
        let curTask = tasks[todolistId];
        let task = curTask.find(item => item.id === taskId);

        if(task) {
            task.title = newValue;
            setTasks({...tasks});
        }
    }

    function addTodoList(title: string) {
        let todolistNew: TodolistType = {id: v1(), filter: "all", title: title};

        setTodolist([todolistNew, ...todolist]);
        setTasks({...tasks, [todolistNew.id]: []});
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

export default App;
